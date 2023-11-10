import express from "express";
import passport from "passport";

import DI from "../DI";
import config from "../config";
import BadRequest from "../exceptions/BadRequest";
import HTTPError from "../exceptions/HTTPError";
import IRouteOptions from "../interfaces/IRouteOptions";
import JwtStrategy from "./JwtStrategy";
import IApiSuccess from "../interfaces/IApiSuccess";

class Application {
  public app = express();

  constructor() {
    this.app.use(express.json());
    passport.use(new JwtStrategy(DI.userService).createStrategy());
  }

  route({ method, prefix, schema, controller, action, auth }: IRouteOptions) {
    const authMiddleware = auth
      ? [passport.authenticate(auth, { session: false })]
      : [];

    // TODO: Use the right types
    // @ts-ignore
    this.app[method](prefix, authMiddleware, async (req, res, next) => {
      DI.logger.log("info", `${method} ${req.url}`);
      try {
        if (method === "post" && schema) {
          await schema.validateAsync(req.body);
        }

        if (method === "get" && schema) {
          await schema.validateAsync(req.query);
        }

        const instance = new controller(DI.userService, DI.jwtService, DI.mail);

        const result: IApiSuccess = await instance[action]({
          payload: req.body,
          query: req.query,
          user: req.user,
        });

        const { data, message = "OK" } = result;
        const httpStatus = result.httpStatus || (data && message) ? 200 : 204;
        return res.status(httpStatus).json({ data, message });
      } catch (error) {
        return next(error);
      }
    });
  }

  private joiErrorHandler(error: any, req: any, res: any, next: any) {
    if (error.isJoi) {
      throw new BadRequest(error.message);
    }
    next(error);
  }

  // TODO: Use the right types
  private globalErrorHandler(error: any, req: any, res: any, next: any) {
    if (error instanceof HTTPError) {
      return res.status(error.statusCode).json(error.payload);
    }

    // TODO: A more robust error handling solution
    // Don't forget to report internal errors to a service like Sentry
    console.error(error);
    return res.status(500).end("internal server error");
  }

  listen() {
    this.app.use(this.joiErrorHandler);
    this.app.use(this.globalErrorHandler);

    return new Promise((resolve) => {
      this.app.listen(config.PORT, () => {
        DI.logger.log(
          "info",
          `> The server is listening on http://localhost:${config.PORT}`
        );
        resolve(null);
      });
    });
  }
}

export default Application;
