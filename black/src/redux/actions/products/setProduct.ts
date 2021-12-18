import { Dispatch } from "@reduxjs/toolkit";
import apiGetProducts from "@/api/httpService/apiGetProducts";
import QueryParams from "@/types/interfaces/filter/queryParams";
import actions from "../actions";
import ProductActions from "../news/newsActionTypes";
import IBasicProduct from "@/api/types/products/IBasicProduct";

const mockData: IBasicProduct[] = [
  { id: 1, company: "kok", name: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  { id: 2, company: "kok", name: "Acer aspired", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  { id: 3, company: "kok", name: "Acer aspider", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  { id: 4, company: "kok", name: "Acer aspidero", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  { id: 5, company: "kok", name: "Acer aspidore", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  { id: 6, company: "kok", name: "Acer aspidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  { id: 7, company: "kok", name: "Acer spidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  { id: 8, company: "kok", name: "Acer pidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
];

const setProductsDispatch =
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
export default setProductsDispatch;
