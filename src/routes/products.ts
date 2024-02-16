import ProductController from "../modules/product/ProductController"
import {
  createSchema,
  findQuerySchema,
  updateSchema,
} from "../modules/product/schema"
import Application from "../providers/Application"

export default function (app: Application) {
  app.route<ProductController>({
    method: "post",
    prefix: "/products",
    schema: createSchema,
    Controller: ProductController,
    action: "create",
    auth: "jwt",
  })

  app.route<ProductController>({
    method: "put",
    prefix: "/products/:id",
    schema: updateSchema,
    Controller: ProductController,
    action: "updateById",
    auth: "jwt",
  })

  app.route<ProductController>({
    method: "get",
    action: "find",
    prefix: "/products",
    schema: findQuerySchema,
    Controller: ProductController,
    auth: "jwt",
  })

  app.route<ProductController>({
    method: "delete",
    action: "delete",
    prefix: "/products/:id",
    Controller: ProductController,
    auth: "jwt",
  })

  app.route<ProductController>({
    method: "get",
    action: "getById",
    prefix: "/products/:id",
    Controller: ProductController,
    auth: "jwt",
  })
}
