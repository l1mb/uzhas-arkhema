import QueryParams from "@/types/interfaces/filter/queryParams";
import buildString from "@/types/interfaces/filter/queryString";
import aggregateProductsDto from "../aggregateProductDto";
import endpoints from "../endpoints";
import IBasicProduct from "../types/products/IBasicProduct";
import IGroupedProduct from "../types/products/IGroupedProduct";
import httpService from "./httpService";

const apiProductsList = async (
  orderby: string,
  ordertype: number,
  displayLimit: number
): Promise<IGroupedProduct[]> => {
  const downloadLimit = 9;
  const data = await httpService.get<IBasicProduct[]>(
    `${endpoints.getProductListEndpoint}?Limit=${downloadLimit}&OrderBy=${orderby}&OrderType=${ordertype}`
  );

  const aggregated = aggregateProductsDto(data);

  return aggregated.slice(0, displayLimit);
};

const apiNonGroupedProductsList = async (
  orderby: string,
  ordertype: number,
  limit: number
): Promise<IBasicProduct[]> => {
  const data = await httpService.get<IBasicProduct[]>(
    `${endpoints.getProductListEndpoint}?Limit=${limit}&OrderBy=${orderby}&OrderType=${ordertype}`
  );

  return data;
};

const apiSortedProductsList = async (params: QueryParams): Promise<IBasicProduct[]> => {
  const query = buildString(params.criteria, params.type, params.limit, params.offset, params.query, params.filterby);

  const data = await httpService.get<IBasicProduct[]>(`${endpoints.getProductListEndpoint + query}`);

  return data;
};

const apiGetSearchProducts = async (name: string): Promise<IGroupedProduct[]> => {
  const data = await httpService.get<IBasicProduct[]>(`${endpoints.getProductSearchEndpoint}?term=${name}&limit=10`);
  const aggregated = aggregateProductsDto(data);
  return aggregated;
};

const apiGetPagedItems = async (limit: number, offset: number) => {
  const data = await httpService.get<IBasicProduct[]>(`${endpoints.products}?offset=${limit}&limit=${offset}`);
  return data;
};

export default {
  apiProductsList,
  apiSortedProductsList,
  apiGetSearchProducts,
  apiNonGroupedProductsList,
  apiGetPagedItems,
};
