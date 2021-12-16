import OrderBy from "@/api/types/Products/enums/orderBy";
import OrderType from "@/api/types/Products/enums/orderType";

const handleFirstItem = (src: string, addedValue: string) => {
  const data = (src === "?" ? "" : `&`) + addedValue.toLowerCase();
  return data;
};

const buildString = (
  criteria: string | OrderBy | undefined,
  type: string | OrderType | undefined,
  limit: number | undefined,
  offset: number | undefined,
  query: string | undefined,
  filterby: string | undefined
): string => {
  let initQuery = "?";

  initQuery += criteria ? `orderby=${criteria.toLowerCase()}` : "";
  initQuery += type ? handleFirstItem(initQuery, `mode=desc`) : "";
  initQuery += limit ? handleFirstItem(initQuery, `limit=${limit}`) : "";
  initQuery += offset ? handleFirstItem(initQuery, `offset=${offset}`) : "";

  initQuery += query ? handleFirstItem(initQuery, `query=${query}`) : "";

  initQuery += filterby ? handleFirstItem(initQuery, `filterby=${filterby}`) : "";
  return initQuery;
};

export default buildString;
