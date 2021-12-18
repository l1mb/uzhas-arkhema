import { Dispatch } from "react";
import { toast } from "react-toastify";
import apiGetProducts from "@/api/httpService/apiGetProducts";
import ProductsApi from "@/api/httpService/products/productsApi";
import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import actions from "../actions";
import ProductActions from "./newsActionTypes";
import news from "@/types/interfaces/news/news";

const detectPromise = (actionType: string, body:  | number): Promise<Response> => {
  switch (actionType) {
    case ProductActions.CREATE:
      return ProductsApi.postProduct(body as news);
    case ProductActions.UPDATE:
      return ProductsApi.putProduct(body as );
    case ProductActions.DELETE:
      return ProductsApi.deleteProduct(body as number);

    default:
      return ProductsApi.postProduct(body as FormData);
  }
};

const ProductInteractions =
  (actionType: string, body: FormData | number) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: IGroupedProduct[];
    }>
  ): Promise<void> => {
    const promise: Promise<Response> = detectPromise(actionType, body);

    await toast.promise(promise, {
      pending: "Pending",
      success: "Success 👌",
      error: "Reject 🤯",
    });
    const Products = await apiGetProducts.apiProductsList("PublicationDate", 1, 3);

    dispatch(actions.setProducts(Products));
  };

export default ProductInteractions;
