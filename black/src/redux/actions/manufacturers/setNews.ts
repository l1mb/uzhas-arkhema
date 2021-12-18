import { Dispatch } from "@reduxjs/toolkit";
import apiGetProducts from "@/api/httpService/apiGetProducts";
import QueryParams from "@/types/interfaces/filter/queryParams";
import actions from "../actions";
import ProductActions from "./newsActionTypes";
import IBasicProduct from "@/api/types/products/IBasicProduct";

const setNewsDispatch =
  (actionType: string, params?: QueryParams) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: IBasicProduct[];
    }>
  ): Promise<void> => {
    let Products: IBasicProduct[] = [];
    switch (actionType) {
      case ProductActions.INIT_LIST:
        // Products = await apiGetProducts.apiProductsList();

        break;
      case ProductActions.QUERIFIED_LIST:
        if (params) {
          Products = await apiGetProducts.apiSortedProductsList(params);
        }
        break;
      default:
        break;
    }
    dispatch(actions.setProducts(Products));
  };
export default setNewsDispatch;
