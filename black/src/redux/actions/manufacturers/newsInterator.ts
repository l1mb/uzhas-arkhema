import { Dispatch } from "react";
import { toast } from "react-toastify";
import apiGetnews from "@/api/httpService/apiGetProducts";
import newsApi from "@/api/httpService/news/newsApi";
import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import actions from "../actions";
import ProductActions from "./newsActionTypes";
import news from "@/types/interfaces/news/news";
import updateNews from "@/types/interfaces/news/updateNews";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import postNews from "@/types/interfaces/news/postNews";

const detectPromise = (actionType: string, body: news | updateNews | number): Promise<Response> => {
  switch (actionType) {
    case ProductActions.UPDATE:
      return newsApi.putNews(body as updateNews);
    case ProductActions.DELETE:
      return newsApi.deleteNews(body as number);

    default:
      return newsApi.postNews(body as postNews);
  }
};

const MnfrsInteractions =
  (actionType: string, body: news | updateNews | number) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: mnfrReadDto[];
    }>
  ): Promise<void> => {
    const promise: Promise<Response> = detectPromise(actionType, body);

    await toast.promise(promise, {
      pending: "Pending",
      success: "Success 👌",
      error: "Reject 🤯",
    });
    const news = await newsApi.apiGetMnfrs();

    dispatch(actions.setMnfrs(news));
  };

export default MnfrsInteractions;
