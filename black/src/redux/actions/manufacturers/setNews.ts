import { Dispatch } from "@reduxjs/toolkit";
import QueryParams from "@/types/interfaces/filter/queryParams";
import actions from "../actions";
import ProductActions from "./newsActionTypes";
import newsApi from "@/api/httpService/news/newsApi";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";

const setNewsDispatch =
  (actionType: string, params?: QueryParams) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: mnfrReadDto[];
    }>
  ): Promise<void> => {
    let mnfrs: mnfrReadDto[] = [];
    switch (actionType) {
      case ProductActions.INIT_LIST:
        // Products = await apiGetProducts.apiProductsList();

        break;
      case ProductActions.QUERIFIED_LIST:
        if (params) {
          mnfrs = await newsApi.getMnfrs();
        }
        break;
      default:
        break;
    }
    dispatch(actions.setMnfrs(mnfrs));
  };
export default setNewsDispatch;
