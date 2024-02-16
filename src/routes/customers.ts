import CustomerController from "../modules/customer/CustomerController"
import {
  createSchema,
  findQuerySchema,
  updateSchema,
} from "../modules/customer/schema"
import Application from "../providers/Application"

export default function (app: Application) {
  app.route<CustomerController>({
    method: "post",
    prefix: "/customers",
    schema: createSchema,
    Controller: CustomerController,
    action: "create",
    auth: "jwt",
  })

  app.route<CustomerController>({
    method: "put",
    prefix: "/customers/:id",
    schema: updateSchema,
    Controller: CustomerController,
    action: "updateById",
    auth: "jwt",
  })

  app.route<CustomerController>({
    method: "get",
    action: "find",
    prefix: "/customers",
    schema: findQuerySchema,
    Controller: CustomerController,
    auth: "jwt",
  })

  app.route<CustomerController>({
    method: "get",
    action: "getById",
    prefix: "/customers/:id",
    Controller: CustomerController,
    auth: "jwt",
  })

  app.route<CustomerController>({
    method: "delete",
    action: "delete",
    prefix: "/customers/:id",
    Controller: CustomerController,
    auth: "jwt",
  })
}
