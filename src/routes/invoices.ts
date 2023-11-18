import InvoiceController from "../modules/invoice/InvoiceController";
import {
  createSchema,
  updateSchema,
  findQuerySchema,
} from "../modules/invoice/schema";
import Application from "../providers/Application";

export default function (app: Application) {
  app.route({
    controller: InvoiceController,
    method: "post",
    prefix: "/invoices",
    action: "create",
    auth: "jwt",
    schema: createSchema,
  });

  app.route({
    controller: InvoiceController,
    method: "put",
    prefix: "/invoices/:id",
    action: "updateById",
    schema: updateSchema,
  });

  app.route({
    controller: InvoiceController,
    method: "get",
    prefix: "/invoices/:id",
    action: "findById",
  });

  app.route({
    controller: InvoiceController,
    method: "get",
    prefix: "/invoices",
    action: "find",
    schema: findQuerySchema,
  });

  // app.route({
  //   method: "post",
  //   prefix: "/invoices",
  //   schema: createSchema,
  //   controller: InvoiceController,
  //   action: "create",
  //   auth: "jwt",
  // });

  // app.route({
  //   method: "put",
  //   prefix: "/invoices/:id",
  //   schema: updateSchema,
  //   controller: InvoiceController,
  //   action: "updateById",
  //   auth: "jwt",
  // });

  // app.route({
  //   method: "get",
  //   action: "find",
  //   prefix: "/invoices",
  //   schema:findQuerySchema,
  //   controller: InvoiceController,
  //   auth: "jwt",
  // });

  // app.route({
  //   method: "delete",
  //   action: "delete",
  //   prefix: "/invoices/:id",
  //   controller: InvoiceController,
  //   auth: "jwt",
  // });
}
