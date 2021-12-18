import endpoints from "@/api/endpoints";
import IBasicProduct from "@/api/types/products/IBasicProduct";
import postOrderEntity from "@/types/interfaces/order/postOrderEntity";
import OrderProduct from "@/types/interfaces/order/orderProducts";
import getOptions from "../tokenedOptions";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";


const getMnfrs = async (): Promise<mnfrReadDto[]> => {
  const data = await fetch(`${endpoints.products}`, getOptions("GET", false));

  return data.json();
};

const postNews = async (prop: postOrderEntity): Promise<Response> => {
  const data = await fetch(`${endpoints.news}`, getOptions("POST", true, prop));

  return data;
};

const deleteNews = async (prop: { keys: number[] }): Promise<Response> => {
  const data = await fetch(`${endpoints.news}`, getOptions("DELETE", true, prop));

  return data;
};

const putNews = async (body: BackendOrderUpdateEntity): Promise<Response> => {
  const data = await fetch(`${endpoints.news}`, getOptions("PUT", true, body));
  return data;
};

export default { getMnfrs, putNews, deleteNews , postNews};
