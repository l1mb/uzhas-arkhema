import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Tooltip } from "@mui/material";
import styles from "./searchBar.module.scss";
import QueryParams from "@/types/interfaces/filter/queryParams";
import SearchParamType from "@/components/products/search/filterBy";

interface SearchProps {
  params: QueryParams | undefined;
  setParams: (e: QueryParams) => void;
}

function SearchBar(props: SearchProps): JSX.Element {
  const [value, setValue] = useState<string>("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleSearch = () => {
    const prevProps = props.params;
    if (prevProps && value.length > 0) {
      prevProps.query = value;
      props.setParams(JSON.parse(JSON.stringify(prevProps)));
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <SearchParamType params={props.params} setParams={props.setParams} />
      <input type="text" placeholder="Search" className={styles.bar} value={value} onChange={onInputChange} />

      <Tooltip title="Sho" className={styles.searchIcon}>
        <IconButton onClick={handleSearch}>
          <SearchIcon sx={{ color: "#f8f9fa" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
export default SearchBar;
