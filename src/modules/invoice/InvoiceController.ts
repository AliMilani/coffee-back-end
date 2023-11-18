import _ from "lodash";

import DI from "../../DI";
import IApiSuccess from "../../interfaces/IApiSuccess";
import InvoiceService from "../../providers/InvoiceService";
import Logger from "../../providers/Logger";
import ICreateInvoice from "../../interfaces/ICreateInvoice";
import IInvoice from "../../interfaces/IInvoice";
import { NotFound } from "../../exceptions";
import IInvoiceAddProductPayload from "../../interfaces/IInvoiceAddProductPayload";

class InvoiceController {
  constructor({ logger, invoiceService }: typeof DI) {
    this.logger = logger;
    this.invoiceService = invoiceService;
  }
  private readonly logger: Logger;
  private readonly invoiceService: InvoiceService;

  create = async ({
    payload,
  }: {
    payload: ICreateInvoice;
  }): Promise<IApiSuccess> => {
    return {
      data: await this.invoiceService.create(payload),
      httpStatus: 201,
    };
  };

  updateById = async ({
    params: { id },
    payload,
  }: {
    params: { id: string };
    payload: Partial<IInvoice>;
  }): Promise<IApiSuccess> => {
    try {
      const data = await this.invoiceService.updateById(id, payload);
      return {
        data,
      };
    } catch (error) {
      if (error instanceof Error && error.message == "Not found by id") throw new NotFound();
      throw error;
    }
  };

  findById = async ({
    params: { id },
  }: {
    params: { id: string };
  }): Promise<IApiSuccess> => {
    const data = await this.invoiceService.findByID(id);
    if (!data) throw new NotFound();
    return {
      data,
    };
  };

  find = async ({
    query,
  }: {
    query: {
      page: number | undefined;
      limit: number | undefined;
    };
  }): Promise<IApiSuccess> => {
    const { limit, page } = query;
    const invoices = await this.invoiceService.findByPagination({
      limit,
      page,
    });
    return {
      data: invoices,
    };
  };

  delete = async ({
    params: { id },
  }: {
    params: { id: string };
  }): Promise<IApiSuccess> => {
    const isDeleted = await this.invoiceService.delete(id);
    if (!isDeleted) throw new NotFound();
    return {};
  };

  addProduct = async ({
    payload,
    params: { id },
  }: {
    payload: IInvoiceAddProductPayload;
    params: { id: string };
  }): Promise<IApiSuccess> => {
    return {};
  };
}

export default InvoiceController;
