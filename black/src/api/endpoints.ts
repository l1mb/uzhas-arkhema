const host = "/api";
const getProductSearchEndpoint = `${host}/products/search`;
const getProductListEndpoint = `${host}/products`;
const getProductByPlatform = `${host}/products/byPlatform`;
const getProductsById = `${host}/products`;
const products = `${host}/products`;

const postSignUp = `${host}/users/sign-up`;
const postSignIn = `${host}/users/login`;
const user = `${host}/users/current`;
const userPassword = `${host}/${user}/password`;
const orders = `${host}/orders`;
const declineOrders = `${orders}/reject`;
const completeOrders = `${orders}/complete`;
const pages = `${products}/pages`;
const mnfrs = `${host}/manufacturers`;
const news = `${mnfrs}/news`;

export default {
  getProductSearchEndpoint,
  getProductListEndpoint,
  products,
  postSignUp,
  postSignIn,
  user,
  userPassword,
  orders,
  getProductByPlatform,
  getProductsById,
  declineOrders,
  completeOrders,
  pages,
  news,
  mnfrs,
};
