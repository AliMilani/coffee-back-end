import InvoiceController from "../modules/invoice/InvoiceController"
import {
  createSchema,
  updateSchema,
  findQuerySchema,
  invoiceAddProductSchema,
} from "../modules/invoice/schema"
import Application from "../providers/Application"

export default function (app: Application) {
  app.route<InvoiceController>({
    Controller: InvoiceController,
    method: "post",
    prefix: "/invoices",
    action: "create",
    auth: "jwt",
    schema: createSchema,
  })

  app.route<InvoiceController>({
    Controller: InvoiceController,
    method: "put",
    prefix: "/invoices/:id",
    action: "updateById",
    schema: updateSchema,
    auth: "jwt",
  })

  app.route<InvoiceController>({
    Controller: InvoiceController,
    method: "get",
    prefix: "/invoices/:id",
    action: "findById",
    auth: "jwt",
  })

  app.route<InvoiceController>({
    Controller: InvoiceController,
    method: "get",
    prefix: "/invoices",
    action: "find",
    schema: findQuerySchema,
    auth: "jwt",
  })

  app.route<InvoiceController>({
    Controller: InvoiceController,
    schema: invoiceAddProductSchema,
    method: "post",
    prefix: "/invoices/:invoiceId/products",
    action: "addProduct",
    auth: "jwt",
  })

  app.route<InvoiceController>({
    Controller: InvoiceController,
    method: "put",
    prefix: "/invoices/:invoiceId/products/:productId",
    action: "updateProduct",
    auth: "jwt",
  })

  app.route<InvoiceController>({
    Controller: InvoiceController,
    method: "delete",
    prefix: "/invoices/:invoiceId/products/:productId",
    action: "deleteProduct",
    auth: "jwt",
  })

  // app.route<InvoiceController>({
  //   method: "post",
  //   prefix: "/invoices",
  //   schema: createSchema,
  //   controller: InvoiceController,
  //   action: "create",
  //   auth: "jwt",
  // });

  // app.route<InvoiceController>({
  //   method: "put",
  //   prefix: "/invoices/:id",
  //   schema: updateSchema,
  //   controller: InvoiceController,
  //   action: "updateById",
  //   auth: "jwt",
  // });

  // app.route<InvoiceController>({
  //   method: "get",
  //   action: "find",
  //   prefix: "/invoices",
  //   schema:findQuerySchema,
  //   controller: InvoiceController,
  //   auth: "jwt",
  // });

  // app.route<InvoiceController>({
  //   method: "delete",
  //   action: "delete",
  //   prefix: "/invoices/:id",
  //   controller: InvoiceController,
  //   auth: "jwt",
  // });
}
