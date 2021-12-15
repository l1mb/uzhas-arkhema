import React from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import QueryItem from "@/api/types/Products/queryParams";
import styles from "./drop.module.scss";

interface menuProps {
  label: string;
  options: Array<QueryItem>;
  changeHandler: (e: QueryItem) => void;
}

function SortDropdown(props: menuProps) {
  const changed = (e: string) => {
    const value = props.options.find((val) => val.label === e);
    if (value) {
      props.changeHandler(value);
    }
  };

  return (
    <Dropdown as={ButtonGroup} className={styles.dropdown}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {props.label}
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        {props.options.map((u) => (
          <Dropdown.Item key={u.label} onClick={() => changed(u.label)}>
            {u.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
