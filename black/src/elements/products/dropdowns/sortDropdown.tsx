import React, { ChangeEvent } from "react";
import QueryItem from "@/api/types/Products/queryParams";
import styles from "./drop.module.scss";

interface menuProps {
  label: string;
  options: Array<QueryItem>;
  value: { label: string; value: string };
  changeHandler: (e: QueryItem) => void;
}

function SortDropdown(props: menuProps) {
  const changed = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = props.options.find((val) => val.label === e.currentTarget.value);
    if (value) {
      props.changeHandler(value);
    }
  };

  return (
    <div className={styles.dropdown}>
      <span>{props.label}</span>
      <select onChange={(e) => changed(e)} value={props?.value.label}>
        {props.options.map((u) => {
          const value = u.label;
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SortDropdown;
