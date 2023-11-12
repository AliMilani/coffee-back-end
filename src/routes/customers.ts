import CustomerController from "../modules/customer/CustomerController";
import { createSchema,findQuerySchema } from "../modules/customer/schema";
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
    method: "get",
    action: "find",
    prefix: "/customers",
    schema:findQuerySchema,
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
