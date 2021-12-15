import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import QueryParams from "@/types/interfaces/filter/queryParams";
import styles from "./styles.module.scss";

interface SearchProps {
  params: QueryParams | undefined;
  setParams: (e: QueryParams) => void;
}
function SearchParamType(props: SearchProps) {
  const [filterBy, setFilterBy] = useState<string>("vendor");

  const handleChange = (event) => {
    setFilterBy(event.target.value);

    const prevProps = props.params;
    if (prevProps && filterBy) {
      prevProps.filterby = event.target.value;
      props.setParams({ ...prevProps });

    }
  };

  useEffect(() => {
    console.log(`filter ${filterBy}`);
  }, []);

  return (
    <div className={styles.bar}>
      <FormControl variant="standard" sx={{ width: "120px", color: "white" }}>
        <InputLabel id="demo-simple-select-standard-label" sx={{ color: "white" }}>
          Filter by
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={handleChange}
          label="Filter by"
          sx={{ color: "white" }}
        >
          <MenuItem value="vendor">Vendor</MenuItem>
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SearchParamType;
