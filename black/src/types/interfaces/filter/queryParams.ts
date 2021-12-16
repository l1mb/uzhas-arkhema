import OrderType from "@/api/types/Products/enums/orderType";

interface QueryParams {
  criteria: string | undefined;
  type: OrderType | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  category: string | undefined;
  query: string | undefined;
  filterby: string | undefined;
}

export default QueryParams;
