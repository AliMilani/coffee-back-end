import CustomerController from "../modules/customer/CustomerController";
import { createSchema } from "../modules/customer/schema";
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
}
