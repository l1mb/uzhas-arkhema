import OrderBy from "./enums/orderBy";
import OrderType from "./enums/orderType";
import QueryItem from "./queryParams";

const OrderByOptions: Array<QueryItem> = [
  {
    label: "Name",
    value: OrderBy.Name,
  },
  {
    label: "Genre",
    value: OrderBy.Genre,
  },
  {
    label: "Count",
    value: OrderBy.Count,
  },
  {
    label: "Price",
    value: OrderBy.Price,
  },
  {
    label: "Publication Date",
    value: OrderBy.PublicationDate,
  },
  {
    label: "Total Rating",
    value: OrderBy.TotalRating,
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
