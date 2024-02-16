import AuthController from "../modules/auth/AuthController"
import { loginSchema, registerSchema } from "../modules/auth/schema"
import Application from "../providers/Application"

export default function (app: Application) {
  app.route<AuthController>({
    method: "post",
    prefix: "/auth/register",
    schema: registerSchema,
    Controller: AuthController,
    action: "register",
  })

  app.route<AuthController>({
    method: "post",
    prefix: "/auth/login",
    schema: loginSchema,
    Controller: AuthController,
    action: "login",
  })

  app.route<AuthController>({
    method: "post",
    prefix: "/auth/send-verification-email",
    Controller: AuthController,
    action: "sendEmail",
    auth: "jwt",
  })

  app.route<AuthController>({
    method: "get",
    prefix: "/auth/verify-email",
    Controller: AuthController,
    action: "verifyEmail",
  })
}
