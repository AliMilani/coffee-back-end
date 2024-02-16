import ProductController from "../modules/product/ProductController"
import {
  createSchema,
  findQuerySchema,
  updateSchema,
} from "../modules/product/schema"
import Application from "../providers/Application"

export default function (app: Application) {
  app.route({
    method: "post",
    prefix: "/products",
    schema: createSchema,
    controller: ProductController,
    action: "create",
    auth: "jwt",
  })

  app.route({
    method: "put",
    prefix: "/products/:id",
    schema: updateSchema,
    controller: ProductController,
    action: "updateById",
    auth: "jwt",
  })

  app.route({
    method: "get",
    action: "find",
    prefix: "/products",
    schema: findQuerySchema,
    controller: ProductController,
    auth: "jwt",
  })

  app.route({
    method: "delete",
    action: "delete",
    prefix: "/products/:id",
    controller: ProductController,
    auth: "jwt",
  })

  app.route({
    method: "get",
    action: "getById",
    prefix: "/products/:id",
    controller: ProductController,
    auth: "jwt",
  })
}
