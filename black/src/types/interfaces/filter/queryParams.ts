import OrderBy from "@/api/types/Products/enums/orderBy";
import OrderType from "@/api/types/Products/enums/orderType";

interface QueryParams {
  criteria: OrderBy | undefined;
  type: OrderType | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  category: string | undefined;
  query: string | undefined;
  filterby: string | undefined;
}

export default QueryParams;
