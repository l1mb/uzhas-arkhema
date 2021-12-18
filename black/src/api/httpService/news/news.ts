import endpoints from "@/api/endpoints";
import IBasicProduct from "@/api/types/products/IBasicProduct";
import postOrderEntity from "@/types/interfaces/order/postOrderEntity";
import BackendOrderUpdateEntity from "@/types/interfaces/order/backendOrderUpdateEntity";
import OrderProduct from "@/types/interfaces/order/orderProducts";
import getOptions from "../tokenedOptions";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";

const apiGetnews = async (orderId?: number): Promise<OrderProduct[] | null> => {
  const tdata = await fetch(`${endpoints.news}`, getOptions("GET", true, orderId));

  if (tdata.status === 200) {
    return tdata.json();
  }
  return null;
};

const apiGetOrderProducts = async (productId?: number): Promise<IBasicProduct> => {
  const tdata = await fetch(`${`${endpoints.getProductsById}/${productId}`}`, getOptions("GET", false));

  return tdata.json();
};

const getnews = async (): Promise<mnfrReadDto[]> => {
  const data = await fetch(`${endpoints.products}`, getOptions("GET", false));

  return data.json();
};

const getProducts = async (type?: string) => {
  const data = await getnews(type);

  if (data) {
    return Promise.all(data.map((e) => apiGetOrderProducts(e.productId)));
  }
  return null;
};

const productsWithnews = async (type?: string) => {
  const data = await getnews(type);
  const newproducts = await getProducts(type);

  return {
    data,
    newproducts,
  };
};

const postOrder = async (prop: postOrderEntity): Promise<Response> => {
  const data = await fetch(`${endpoints.news}`, getOptions("POST", true, prop));

  return data;
};

const deletenews = async (prop: { keys: number[] }): Promise<Response> => {
  const data = await fetch(`${endpoints.news}`, getOptions("DELETE", true, prop));

  return data;
};

const updateOrder = async (body: BackendOrderUpdateEntity): Promise<Response> => {
  const data = await fetch(`${endpoints.news}`, getOptions("PUT", true, body));
  return data;
};

export default { getnews };
