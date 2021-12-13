import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ProductsData from "@/api/types/products/productData";
import QueryItem from "@/api/types/products/queryParams";
import Label from "@/elements/home/labelElement/label";
import SortDropdown from "@/elements/products/dropdowns/sortDropdown";
import RadioButtons from "@/elements/products/RadioButtons/radiobuttons";

import OrderBy from "@/api/types/products/enums/orderBy";
import OrderType from "@/api/types/products/enums/orderType";
import AgeRating from "@/api/types/products/enums/ageRating";
import Genre from "@/api/types/products/enums/genre";
import QueryParams from "@/types/interfaces/filter/queryParams";
import buildString from "@/types/interfaces/filter/queryString";
import filterData from "@/types/constants/components/products/filter/filterData";
import styles from "./filter.module.scss";
import StateType from "@/redux/types/stateType";
import roles from "@/types/constants/roles/roles";

interface FilterProps {
  setQuery: (e: QueryParams) => void;
  setOpen: (e: boolean) => void;
  categorie: string;
  setMode: () => void;
}

function FilterBar(props: FilterProps) {
  const [genre, setGenre] = useState<QueryItem>();
  const [age, setAge] = useState<QueryItem>();
  const [criteria, setCriteria] = useState<QueryItem>();
  const [type, setType] = useState<QueryItem>();
  const [queryString, setQuery] = useState("");
  const { search } = useLocation();
  const history = useHistory();

  const role = useSelector<StateType, string>((state) => state.role);

  const pushParameters = () => {
    props.setQuery({
      criteria: criteria?.value as OrderBy,
      type: type?.value as OrderType,
      age: age?.value as AgeRating,
      genre: genre?.value as Genre,
      category: props.categorie,
    });

    console.log(queryString);
  };

  useEffect(() => {
    setQuery(buildString(criteria?.label, type?.label, age?.label, genre?.label, props.categorie));
    pushParameters();
  }, [queryString, criteria, type, age, genre, search, props.categorie]);

  return (
    <div className={styles.filterContainer}>
      <div>
        {role === roles.admin && (
          <div className={styles.createButton}>
            <Label content="Admin is here" classname={styles.labels} />
            <Button
              variant="light"
              onClick={() => {
                props.setOpen(true);
                props.setMode();
              }}
            >
              Create new product
            </Button>
          </div>
        )}
        <div>
          <Label content={filterData.label.genres} classname={styles.labels} />
          <RadioButtons
            options={ProductsData.GenreOptions}
            value={genre}
            changeHandler={(e: QueryItem) => setGenre(e)}
          />
        </div>
        <Label content={filterData.label.orderBy} classname={styles.labels} />
        <SortDropdown
          label={filterData.label.orderBy}
          options={ProductsData.OrderByOptions}
          changeHandler={(e: QueryItem) => setCriteria(e)}
        />
        <SortDropdown
          label={filterData.label.orderType}
          options={ProductsData.OrderTypeOptions}
          changeHandler={(e: QueryItem) => setType(e)}
        />
      </div>

      <div>
        <Label content={filterData.label.age} classname={styles.labels} />
        <RadioButtons options={ProductsData.AgeOprions} value={age} changeHandler={(e: QueryItem) => setAge(e)} />
      </div>
    </div>
  );
}

export default FilterBar;
