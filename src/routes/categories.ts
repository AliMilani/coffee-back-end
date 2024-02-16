import CategoryController from "../modules/category/CategoryController"
import {
  createSchema,
  findQuerySchema,
  updateSchema,
} from "../modules/category/schema"
import Application from "../providers/Application"

export default function (app: Application) {
  app.route({
    method: "post",
    prefix: "/categories",
    schema: createSchema,
    controller: CategoryController,
    action: "create",
    auth: "jwt",
  })

  app.route({
    method: "put",
    prefix: "/categories/:id",
    schema: updateSchema,
    controller: CategoryController,
    action: "updateById",
    auth: "jwt",
  })

  app.route({
    method: "get",
    action: "find",
    prefix: "/categories",
    schema: findQuerySchema,
    controller: CategoryController,
    auth: "jwt",
  })

  app.route({
    method: "delete",
    action: "delete",
    prefix: "/categories/:id",
    controller: CategoryController,
    auth: "jwt",
  })

  app.route({
    method: "get",
    action: "getById",
    prefix: "/categories/:id",
    controller: CategoryController,
    auth: "jwt",
  })
}
