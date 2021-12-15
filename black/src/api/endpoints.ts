const host = "/api";
const getProductSearchEndpoint = `${host}/products/search`;
const getProductListEndpoint = `${host}/products/list`;
const getProductByPlatform = `${host}/products/byPlatform`;
const getProductsById = `${host}/products/id`;
const products = `${host}/products`;

const postSignUp = `${host}/users/sign-up`;
const postSignIn = `${host}/users/login`;
const user = `${host}/users/current`;
const userPassword = `${host}/${user}/password`;
const orders = `${host}/orders`;
const approveOrders = `${orders}/approve`;
const declineOrders = `${orders}/decline`;
const cancelOrders = `${orders}/cancel`;
const vendors = "/vendors";
const categories = "/categories";

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
  approveOrders,
  declineOrders,
  cancelOrders,
  vendors,
  categories,
};
