import Invoice from "../models/Invoice"
import IInvoice, { InvoiceItem } from "../interfaces/IInvoice"
import { paginationPipeLine } from "../helpers/aggregation-pipeline-pagination"
import ICreateInvoice from "../interfaces/ICreateInvoice"
import IUpdateInvoicePayload from "../interfaces/IUpdateInvoicePayload"
import IInvoiceUpdateProductPayload from "../interfaces/IInvoiceUpdateProductPayload"
import IInvoiceAddProductPayload from "../interfaces/IInvoiceAddProductPayload"
import IProduct from "../interfaces/IProduct"

class InvoiceService {
  create = async ({ customer }: ICreateInvoice) => {
    const createdInvoice = await Invoice.create({
      customer,
      invoiceNumber: this._calcualteInvoiceNumber(),
    })

    return await createdInvoice.populate("customer")
  }

  private _calcualteInvoiceNumber = () => {
    return 12356
  }

  updateById = async (id: string, payload: IUpdateInvoicePayload) => {
    const updatedDoc = await Invoice.findByIdAndUpdate(
      id,
      {
        $set: {
          ...payload,
          // status: "draft" as InvoiceStatus,
        },
      },
      {
        new: true,
      },
    )
      .populate("customer")
      .lean()
    if (!updatedDoc) throw new Error("Not found by id")
    await this.updateTotalPaymentAmount(id)
    return updatedDoc
  }

  private _getTotalPaymentAmount = ({
    productItems,
    invoiceDiscount = 0,
    ServiceFee = 0,
  }: {
    productItems: InvoiceItem[]
    invoiceDiscount?: number
    ServiceFee?: number
  }): number => {
    const itemsPaymentAmount = this._getItemsPrice(productItems || [])
    const totalPaymentAmount =
      itemsPaymentAmount - (invoiceDiscount + ServiceFee)
    // console.log({
    //   itemsPaymentAmount,
    //   invoiceDiscount,
    //   ServiceFee,
    //   totalPaymentAmount,
    // });
    return totalPaymentAmount
  }

  private _getItemsPrice = (invoiceItems: InvoiceItem[]): number => {
    return invoiceItems.reduce((total, item) => {
      const itemTotalPrice = this._itemTotalPrice(item)
      const itemTotalDiscount = this._itemTotalDiscount(item)
      // console.log({ total, itemTotalPrice, itemTotalDiscount });
      return total + itemTotalPrice - itemTotalDiscount
    }, 0)
  }

  private _itemTotalPrice = (item: InvoiceItem): number => {
    return item.product.price * item.total
  }

  private _itemTotalDiscount = (item: InvoiceItem): number => {
    return item.discountAmount * item.total
  }

  findByID = (id: string) => {
    return Invoice.findById(id).populate("items.product customer").lean()
  }

  findByPagination = async ({
    page = 1,
    limit = 10,
  }: {
    page: number | undefined
    limit: number | undefined
  }): Promise<unknown> => {
    const pipeLine = paginationPipeLine<IInvoice>({
      page,
      limit,
      filter: {},
    })
    const result = await Invoice.aggregate(pipeLine)
    if (!result[0]?.items) return result[0]
    await Invoice.populate(result[0].items, { path: "customer" })

    return {
      ...result[0],
    }
  }

  addProduct = async (
    invoiceId: string,
    productItem: Omit<IInvoiceAddProductPayload, "invoice">,
  ): Promise<void> => {
    const invoice = await this.findByID(invoiceId)
    if (!invoice) throw new Error("invoice not found")

    const productId = productItem.product
    const productService = (await import("../DI")).default.productService //TODO:fix DI and remove this line
    const product = await productService.findByID(productId)
    if (!product) throw new Error("Product not found")

    this.#validateProductItem(product, productItem.discountAmount)

    // console.log(product);
    if (invoice.items && invoice.items.length) {
      const isAlreadyAdded = this._getProductItemById(productId, invoice.items)
      if (isAlreadyAdded) throw new Error("Product already added")
    }

    await Invoice.findByIdAndUpdate(invoice._id, {
      $push: {
        items: productItem,
      },
    })
    await this.updateTotalPaymentAmount(invoice._id.toString())
  }

  #validateProductItem = (product: IProduct, discountAmount: number) => {
    if (!product.inStock) throw new Error("Product not in stock")
    if (product.price <= discountAmount)
      throw new Error("Discount amount must be less than product price")
  }

  updateTotalPaymentAmount = async (invoiceId: string) => {
    const invoice = await this.findByID(invoiceId)
    if (!invoice) throw new Error("Invoice not found")

    const totalPaymentAmount = this._getTotalPaymentAmount({
      productItems: invoice.items || [],
      invoiceDiscount: invoice.invoiceDiscount,
      ServiceFee: invoice.ServiceFee,
    })
    // console.log({ totalPaymentAmount });

    await Invoice.findByIdAndUpdate(invoiceId, {
      $set: {
        totalPaymentAmount,
      },
    })
  }

  private _getProductItemById = (
    productId: string,
    productItems: InvoiceItem[],
  ) => {
    return productItems.find(
      (item) => item.product._id.toString() === productId,
    )
  }

  updateProduct = async (
    invoice: IInvoice,
    productId: string,
    productItem: IInvoiceUpdateProductPayload,
  ): Promise<void> => {
    if (!invoice._id) throw new Error("_id is required")
    const invoiceId = invoice._id.toString()
    // console.log({ invoice, productItem, productId });

    const targetInvoiceItem = this._getProductItemById(productId, invoice.items)
    if (!targetInvoiceItem) throw new Error("Product not found to update")

    this.#validateProductItem(
      targetInvoiceItem.product,
      productItem.discountAmount ?? targetInvoiceItem.discountAmount,
    )

    // console.log(targetProduct,productItem)
    // console.log("llllllll")
    // console.log({ ...targetProduct, ...productItem })
    await this.removeProduct(invoiceId, productId)

    const itemToUpdate = { ...targetInvoiceItem, ...productItem }

    const newInvoice = await this.findByID(invoice._id.toString()).lean()
    if (!newInvoice) throw new Error("Invoice not found")
    await this.addProduct(invoiceId, itemToUpdate)
    await this.updateById(invoice._id as string, {})
  }

  removeProduct = async (
    invoiceId: string,
    productId: string,
  ): Promise<void> => {
    const invoice = await this.findByID(invoiceId)
    if (!invoice) throw new Error("Invoice not found")
    const targetProduct = this._getProductItemById(productId, invoice.items)
    if (!targetProduct) throw new Error("Product not found to delete")

    await Invoice.findByIdAndUpdate(invoiceId, {
      $pull: {
        items: {
          product: productId,
        },
      },
    })
    await this.updateTotalPaymentAmount(invoiceId)
  }

  getProducts = async (invoiceId: string) => {
    const products = await Invoice.findById(invoiceId).select("items")
    if (!products) throw new Error("Not found by id")
    return products?.items || []
  }

  // completeInvoice = async (invoiceId: string) => {}

  // cancelInvoice = async () => {}

  delete = async (id: string): Promise<boolean> => {
    const deletedCustomer = await Invoice.findByIdAndDelete(id)
    return !!deletedCustomer
  }
}

export default InvoiceService
