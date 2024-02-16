import CustomerController from "../modules/customer/CustomerController";
import {
  createSchema,
  findQuerySchema,
  updateSchema,
} from "../modules/customer/schema";
import Application from "../providers/Application";

export default function (app: Application) {
  app.route({
    method: "post",
    prefix: "/customers",
    schema: createSchema,
    controller: CustomerController,
    action: "create",
    auth: "jwt",
  });

  app.route({
    method: "put",
    prefix: "/customers/:id",
    schema: updateSchema,
    controller: CustomerController,
    action: "updateById",
    auth: "jwt",
  });

  app.route({
    method: "get",
    action: "find",
    prefix: "/customers",
    schema: findQuerySchema,
    controller: CustomerController,
    auth: "jwt",
  });

  app.route({
    method: "get",
    action: "getById",
    prefix: "/customers/:id",
    controller: CustomerController,
    auth: "jwt",
  });

  app.route({
    method: "delete",
    action: "delete",
    prefix: "/customers/:id",
    controller: CustomerController,
    auth: "jwt",
  });
}
