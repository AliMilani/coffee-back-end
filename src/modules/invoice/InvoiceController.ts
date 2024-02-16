import _ from "lodash"

import DI from "../../DI"
import IApiSuccess from "../../interfaces/IApiSuccess"
import InvoiceService from "../../providers/InvoiceService"
import Logger from "../../providers/Logger"
import ICreateInvoice from "../../interfaces/ICreateInvoice"
import IInvoice from "../../interfaces/IInvoice"
import { Conflict, NotFound } from "../../exceptions"
import IInvoiceAddProductPayload from "../../interfaces/IInvoiceAddProductPayload"
import ProductService from "../../providers/ProductService"
import IInvoiceUpdateProductPayload from "../../interfaces/IInvoiceUpdateProductPayload"

class InvoiceController {
  constructor({ logger, invoiceService, productService }: typeof DI) {
    this.logger = logger
    this.invoiceService = invoiceService
    this.productService = productService
  }
  private readonly logger: Logger
  private readonly invoiceService: InvoiceService
  private readonly productService: ProductService

  create = async ({
    payload,
  }: {
    payload: ICreateInvoice
  }): Promise<IApiSuccess> => {
    return {
      data: await this.invoiceService.create(payload),
      httpStatus: 201,
    }
  }

  updateById = async ({
    params: { id },
    payload,
  }: {
    params: { id: string }
    payload: Partial<IInvoice>
  }): Promise<IApiSuccess> => {
    try {
      const data = await this.invoiceService.updateById(id, payload)
      return {
        data,
      }
    } catch (error) {
      if (error instanceof Error && error.message == "Not found by id")
        throw new NotFound()
      throw error
    }
  }

  findById = async ({
    params: { id },
  }: {
    params: { id: string }
  }): Promise<IApiSuccess> => {
    const data = await this.invoiceService.findByID(id)
    if (!data) throw new NotFound()
    return {
      data,
    }
  }

  find = async ({
    query,
  }: {
    query: {
      page: number | undefined
      limit: number | undefined
    }
  }): Promise<IApiSuccess> => {
    const { limit, page } = query
    const invoices = await this.invoiceService.findByPagination({
      limit,
      page,
    })
    return {
      data: invoices || {},
    }
  }

  delete = async ({
    params: { id },
  }: {
    params: { id: string }
  }): Promise<IApiSuccess> => {
    const isDeleted = await this.invoiceService.delete(id)
    if (!isDeleted) throw new NotFound()
    return {}
  }

  addProduct = async ({
    payload,
    params: { invoiceId },
  }: // params: { id },
  {
    payload: IInvoiceAddProductPayload
    params: { invoiceId: string }
  }): Promise<IApiSuccess> => {
    try {
      const invoiceItem = payload

      await this.invoiceService.addProduct(invoiceId, invoiceItem)
      return {
        data: {},
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Product already added")
          throw new Conflict("PRODUCT_ALREADY_ADDED")
        if (error.message === "Discount amount must be less than product price")
          throw new Conflict("OVER_DISCOUNT")
        if ((error.message = "Product not in stock"))
          throw new Conflict("NOT_IN_STOCK")
      }
      throw error
    }
  }

  updateProduct = async ({
    payload: invoiceItem,
    params: { invoiceId, productId },
  }: {
    payload: IInvoiceUpdateProductPayload
    params: { invoiceId: string; productId: string }
  }): Promise<IApiSuccess> => {
    const invoice = await this.invoiceService.findByID(invoiceId)
    if (!invoice) throw new Error("invoice not found")

    try {
      await this.invoiceService.updateProduct(invoice, productId, invoiceItem)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == "Product not found to update")
          throw new Conflict("PRODUCT_NOT_FOUND")
        if (error.message === "Discount amount must be less than product price")
          throw new Conflict("OVER_DISCOUNT")
      }
      throw error
    }

    return {
      data: {},
    }
  }

  deleteProduct = async ({
    params: { invoiceId, productId },
  }: {
    params: { invoiceId: string; productId: string }
  }): Promise<IApiSuccess> => {
    try {
      await this.invoiceService.removeProduct(invoiceId, productId)
    } catch (error) {
      if (!(error instanceof Error)) throw error
      if (error.message === "Invoice not found")
        throw new NotFound("INVOICE_NOT_FOUND")
      if (error.message === "Product not found to delete")
        throw new NotFound("PRODUCT_NOT_FOUND")
      throw error
    }
    return {
      data: {},
    }
  }
}

export default InvoiceController
