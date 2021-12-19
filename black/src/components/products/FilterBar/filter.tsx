import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductsData from "@/api/types/products/productData";
import QueryItem from "@/api/types/products/queryParams";
import SortDropdown from "@/elements/products/dropdowns/sortDropdown";

import OrderType from "@/api/types/products/enums/orderType";
import QueryParams from "@/types/interfaces/filter/queryParams";
import filterData from "@/types/constants/components/products/filter/filterData";
import styles from "./filter.module.scss";
import StateType from "@/redux/types/stateType";
import RadioButtons from "@/elements/products/RadioButtons/radiobuttons";
import productsApi from "@/api/httpService/products/productsApi";
import Label from "@/elements/home/labelElement/label";

interface FilterProps {
  setQuery: (e: QueryParams) => void;
}

function FilterBar(props: FilterProps) {
  const [orderby, setorderby] = useState<{ label: string; value: string }>(ProductsData.OrderByOptions[0]);
  const [type, setType] = useState<QueryItem>(ProductsData.OrderTypeOptions[0]);
  const [pickUp, setPickUp] = useState<{ id: number; name: string }>();
  const [mnfr, setMnfr] = useState<{ id: number; name: string }>();
  // GET THIS FROM QUERY PARAMS;
  const [shape, setShape] = useState<string>();
  const [queryString, setQuery] = useState("");
  const { search } = useLocation();

  const [pickUpData, setPickUpData] = useState<{ id: number; name: string }[]>();
  const [mnfrData, setMnfrData] = useState<{ id: number; name: string }[]>();

  const role = useSelector<StateType, string>((state) => state.role);

  const pushParameters = () => {
    props.setQuery({
      orderby: orderby?.value,
      type: type?.value as OrderType,
      limit: 6,
      offset: 0,
      mnfrId: mnfr?.id,
      pickUp: pickUp?.id,
      shape,
    });
  };

  useEffect(() => {
    console.log(mnfr?.id);
    pushParameters();
  }, [orderby, type, shape, pickUp, mnfr]);

  useEffect(() => {
    async function fetchData() {
      const p = await productsApi.apiGetPickUps();
      const m = await productsApi.apiGetMnfrs();

      setPickUpData(p);
      setMnfrData(m);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(mnfrData);
    console.log(pickUpData);
  }, [mnfrData, pickUpData]);

  return (
    <div className={styles.filterContainer}>
      <Label content={shape} classname={styles.firstname} />
      <div>
        <Label content={filterData.label.orderBy} classname={styles.names} />
        <SortDropdown
          label={filterData.label.orderBy}
          options={ProductsData.OrderByOptions}
          value={orderby}
          changeHandler={(e: QueryItem) => setorderby(e)}
        />
        <SortDropdown
          value={type}
          label={filterData.label.orderType}
          options={ProductsData.OrderTypeOptions}
          changeHandler={(e: QueryItem) => setType(e)}
        />
      </div>
      {pickUpData && pickUpData.length > 0 && (
        <div>
          <Label content={filterData.label.pickups} classname={styles.names} />
          <RadioButtons
            options={pickUpData}
            checkedValue={pickUp?.name}
            changeHandler={(e: { id: number; name: string }) => setPickUp(e)}
          />
        </div>
      )}
      {mnfrData && mnfrData.length > 0 && (
        <div>
          <Label content={filterData.label.mnfrs} classname={styles.names} />
          <RadioButtons
            options={mnfrData}
            checkedValue={mnfr?.name}
            changeHandler={(e: { id: number; name: string }) => setMnfr(e)}
          />
        </div>
      )}
    </div>
  );
}

export default FilterBar;
