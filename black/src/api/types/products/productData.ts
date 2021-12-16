import OrderType from "./enums/orderType";
import QueryItem from "./queryParams";

const OrderByOptions: Array<{ label: string; value: string }> = [
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Vendor",
    value: "vendor",
  },
  {
    label: "Category",
    value: "category",
  },
  {
    label: "Price",
    value: "price",
  },
];
const OrderTypeOptions: Array<QueryItem> = [
  {
    label: "Ascending",
    value: OrderType.Asc,
  },
  {
    label: "Descending",
    value: OrderType.Desc,
  },
];

export default { OrderByOptions, OrderTypeOptions };
