import CategoryController from "../modules/category/CategoryController"
import {
  createSchema,
  findQuerySchema,
  updateSchema,
} from "../modules/category/schema"
import Application from "../providers/Application"

export default function (app: Application) {
  app.route<CategoryController>({
    method: "post",
    prefix: "/categories",
    schema: createSchema,
    Controller: CategoryController,
    action: "create",
    auth: "jwt",
  })

  app.route<CategoryController>({
    method: "put",
    prefix: "/categories/:id",
    schema: updateSchema,
    Controller: CategoryController,
    action: "updateById",
    auth: "jwt",
  })

  app.route<CategoryController>({
    method: "get",
    action: "find",
    prefix: "/categories",
    schema: findQuerySchema,
    Controller: CategoryController,
    auth: "jwt",
  })

  app.route<CategoryController>({
    method: "delete",
    action: "delete",
    prefix: "/categories/:id",
    Controller: CategoryController,
    auth: "jwt",
  })

  app.route<CategoryController>({
    method: "get",
    action: "getById",
    prefix: "/categories/:id",
    Controller: CategoryController,
    auth: "jwt",
  })
}
