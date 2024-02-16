import AuthController from "../modules/auth/AuthController"
import { loginSchema, registerSchema } from "../modules/auth/schema"
import Application from "../providers/Application"

export default function (app: Application) {
  app.route({
    method: "post",
    prefix: "/auth/register",
    schema: registerSchema,
    controller: AuthController,
    action: "register",
  })

  app.route({
    method: "post",
    prefix: "/auth/login",
    schema: loginSchema,
    controller: AuthController,
    action: "login",
  })

  app.route({
    method: "post",
    prefix: "/auth/send-verification-email",
    controller: AuthController,
    action: "sendEmail",
    auth: "jwt",
  })

  app.route({
    method: "get",
    prefix: "/auth/verify-email",
    controller: AuthController,
    action: "verifyEmail",
  })
}
