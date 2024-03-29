import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import passport from "passport"

import DI from "../DI"
import config from "../config"
import HTTPError from "../exceptions/HTTPError"
import IRouteOptions from "../interfaces/IRouteOptions"
import JwtStrategy from "./JwtStrategy"
import IApiSuccess from "../interfaces/IApiSuccess"
import apiValidator from "../utils/apiValidator"

class Application {
  public app = express()

  constructor() {
    this.app.use(express.json())
    this.app.use(cors())
    passport.use(new JwtStrategy(DI.userService).createStrategy())
  }

  route<ControllerType>({
    method,
    prefix,
    schema,
    Controller,
    action,
    auth,
  }: IRouteOptions<ControllerType>) {
    const authMiddleware = auth
      ? [passport.authenticate(auth, { session: false })]
      : []

    this.app[method](
      `/api${prefix}`,
      authMiddleware,
      async (req: Request, res: Response, next: NextFunction) => {
        DI.logger.log("info", `${method} ${req.url}`)
        try {
          if ((method === "post" && schema) || (method === "put" && schema)) {
            // await schema.validateAsync(req.body)
            const result = await apiValidator(schema, req.body)
            if (result)
              return res.status(422).send({
                error: "invalid_body",
                errors: result,
              })
          }

          if (method === "get" && schema) {
            const result = await apiValidator(schema, req.query)
            if (result)
              return res.status(422).send({
                error: "invaid_query",
                errors: result,
              })
          }

          const instance = new Controller(DI)

          const result: IApiSuccess = await instance[action]({
            payload: req.body,
            query: req.query,
            user: req.user,
            params: req.params,
          })

          const { data, message = "OK" } = result
          const httpStatus = result.httpStatus || (data && message) ? 200 : 204
          return res.status(httpStatus).json({ data, message })
        } catch (error) {
          return next(error)
        }
      },
    )
  }

  // private joiErrorHandler(error: any, req: any, res: any, next: any) {
  //   if (error.isJoi) {
  //     throw new BadRequest(error.message);
  //   }
  //   next(error);
  // }

  // TODO: Use the right types
  private globalErrorHandler(error: unknown, req: Request, res: Response) {
    if (error instanceof HTTPError) {
      return res.status(error.statusCode).json(error.payload)
    }

    // TODO: A more robust error handling solution
    // Don't forget to report internal errors to a service like Sentry
    console.error(error)
    return res.status(500).end("internal server error")
  }

  listen() {
    // this.app.use(this.joiErrorHandler);
    this.app.use(this.globalErrorHandler)

    return new Promise((resolve) => {
      this.app.listen(config.PORT, () => {
        DI.logger.log(
          "info",
          `> The server is listening on http://localhost:${config.PORT}`,
        )
        resolve(null)
      })
    })
  }
}

export default Application
