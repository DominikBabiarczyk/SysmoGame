import { PaginationParams, Pagination } from "@src/models/pagination";
import { Product } from "@src/models/product";
import { api } from "./client";

export namespace ProductApi {
  interface GetProductsParams extends PaginationParams {
    search?: string;
  }

  export const getProducts = async (
    params: GetProductsParams,
  ): Promise<Pagination<Product>> => {
    const res = await api.get<Pagination<Product>>("shopProducts", {
      params: {
        page: params.page,
        limit: params.limit,
      },
    });
    return res.data;
  };

  export const getMyProducts = async (
    params: PaginationParams,
  ): Promise<Pagination<Product>> => {
    const res = await api.get<Pagination<Product>>("shopProducts/own", {
      params,
    });
    return res.data;
  };

  export const getProductById = async (productId: string) => {
    const res = await api.get<Product>(`shopProducts/${productId}`);
    return res.data;
  };

  interface CreateProductReq {
    title: string;
    description?: string;
    categoryId: string;
    fileIds: string[];
    keywords: string;
  }

  export const createProduct = async (data: CreateProductReq) => {
    const { fileIds, keywords, ...obj } = data;
    const res = await api.post("shopProducts", {
      files: fileIds.map((el, index) => {
        return {
          type: "SHOP_PRODUCT",
          id: el,
          itemNumber: index + 1,
        };
      }),
      keywords: keywords.split(","),
      ...obj,
    });
    return res.data;
  };

  interface UpdateProductReq extends CreateProductReq {
    productId: string;
  }

  export const updateProduct = async (params: UpdateProductReq) => {
    const res = await api.put(`shopProducts/${params.productId}`, {
      title: params.title,
      description: params.description,
      categoryId: params.categoryId,
      fileIds: params.fileIds,
      keywords: params.keywords,
    });
    return res.data;
  };
}
