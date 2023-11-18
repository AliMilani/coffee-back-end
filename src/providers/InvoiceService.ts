import _ from "lodash";

import Invoice from "../models/Invoice";
import IInvoice, { InvoiceItem } from "../interfaces/IInvoice";
import { paginationPipeLine } from "../helpers/aggregation-pipeline-pagination";
import ICreateInvoice from "../interfaces/ICreateInvoice";
import IProduct from "../interfaces/IProduct";
import IUpdateInvoicePayload from "../interfaces/IUpdateInvoicePayload";
// import IInvoiceAddProductPayload from "../interfaces/IInvoiceAddProductPayload";
// import mongoose from "mongoose";

class InvoiceService {
  create = async ({ customer }: ICreateInvoice) => {
    const createdInvoice = await Invoice.create({
      customer,
      invoiceNumber: this._calcualteInvoiceNumber(),
    });

    return await createdInvoice.populate("customer");
  };

  private _calcualteInvoiceNumber = () => {
    return 12356;
  };

  /*
  itemPrice = (productPrice - discountAmount) * total
  itemsPrices = itemPrice + itemPrice + itemPrice
  totalPaymentAmount =(itemsPrices -ServiceFee) - invoiceDiscount
  */

  updateById = async (id: string, payload: IUpdateInvoicePayload) => {
    const invoice = await this.findByID(id);

    const invoiceDiscount =
      payload.invoiceDiscount || invoice?.invoiceDiscount || 0;

    const ServiceFee = payload.ServiceFee || invoice?.ServiceFee || 0;

    const totalPaymentAmount = this._getTotalPaymentAmount({
      productItems: invoice?.items || [],
      invoiceDiscount,
      ServiceFee,
    });

    const updatedDoc = await Invoice.findByIdAndUpdate(
      id,
      {
        $set: {
          ...payload,
          totalPaymentAmount,
          // status: "draft" as InvoiceStatus,
        },
      },
      {
        new: true,
      }
    )
      .populate("customer")
      .lean();
    if (!updatedDoc) throw new Error("Not found by id");
    return updatedDoc;
  };

  private _getTotalPaymentAmount = ({
    productItems,
    invoiceDiscount = 0,
    ServiceFee = 0,
  }: {
    productItems: InvoiceItem[];
    invoiceDiscount: number;
    ServiceFee: number;
  }): number => {
    const itemsPaymentAmount = this._getItemsPrice(productItems || []);
    const totalPaymentAmount =
      itemsPaymentAmount - (invoiceDiscount + ServiceFee);
    return totalPaymentAmount;
  };

  private _getItemsPrice = (invoiceItems: InvoiceItem[]): number => {
    return (
      invoiceItems?.reduce((a: number, c: InvoiceItem) => {
        const discount = this._itemTotalDiscount(c);
        return c.product.price - discount + a;
      }, 0) || 0
    );
  };

  private _itemTotalDiscount = ({
    discountAmount,
    product,
    total,
  }: Omit<InvoiceItem, "product"> & { product: IProduct }) => {
    const price = product.price;
    return (price - discountAmount) * total;
  };

  findByID = (id: string) => {
    return Invoice.findById(id).populate("items.product customer").lean();
  };

  findByPagination = async ({
    page = 1,
    limit = 10,
  }: {
    page: number | undefined;
    limit: number | undefined;
  }) => {
    const pipeLine = paginationPipeLine<IInvoice>({
      page,
      limit,
      filter: {},
    });
    const result = await Invoice.aggregate(pipeLine);

    await Invoice.populate(result[0].items, { path: "customer" });

    return {
      ...result[0],
    };
  };

  addProduct = async (
    invoice: IInvoice,
    productItem: InvoiceItem
  ): Promise<void> => {
    const productId = productItem.product._id?.toString();
    if (typeof productId !== "string") throw new Error("ProductId is required");

    const isAlreadyAdded = !!this._getProductItemById(productId, invoice.items);
    if (isAlreadyAdded) throw new Error("Product already added");

    await Invoice.findByIdAndUpdate(invoice._id, {
      $push: {
        items: productItem,
      },
    });
  };

  private _getProductItemById = (
    productId: string,
    productItems: InvoiceItem[]
  ) => {
    return productItems.find((item) => item.product.toString() === productId);
  };

  updateProduct = async (
    invoice: IInvoice,
    productId: string,
    productItem: Partial<InvoiceItem>
  ) => {
    if (!invoice._id) throw new Error("_id is required");
    const invoiceId = invoice._id.toString();

    const targetProduct = this._getProductItemById(productId, invoice.items);
    if (!targetProduct) throw new Error("Product not found to update");

    await this.removeProduct(invoiceId, productId);

    const itemToUpdate = { ...targetProduct, ...productItem };

    await this.addProduct(invoice, itemToUpdate);
  };

  removeProduct = async (invoiceId: string, productId: string) => {
    await Invoice.findByIdAndUpdate(invoiceId, {
      $pull: {
        "items.$.productId": productId,
      },
    });
  };

  getProducts = async (invoiceId: string) => {
    const products = await Invoice.findById(invoiceId).select("items");
    if (!products) throw new Error("Not found by id");
    return products?.items || [];
  };

  completeInvoice = async (invoiceId: string) => {};

  cancelInvoice = async () => {};

  delete = async (id: string): Promise<boolean> => {
    const deletedCustomer = await Invoice.findByIdAndDelete(id);
    return !!deletedCustomer;
  };
}

export default InvoiceService;
