import React, { ChangeEvent } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import QueryItem from "@/api/types/Products/queryParams";
import styles from "./radiobuttons.module.scss";

interface ButtonProps {
  options: Array<QueryItem>;
  value: QueryItem | undefined;
  changeHandler: (e: QueryItem) => void;
}

function RadioButtons(props: ButtonProps) {
  const changed = (e: ChangeEvent<HTMLInputElement>) => {
    const value = props.options.find((val) => val.label === e.currentTarget.value);
    if (value) {
      props.changeHandler(value);
    }
  };
  return (
    // <form className={styles.buttonContainer}>
    //   {props.options.map((o) => {
    //     const { label } = o;
    //     return (
    //       <div key={label}>
    //         <input
    //           type="radio"
    //           id={label}
    //           name={label}
    //           value={label}
    //           checked={props.value?.label === label}
    //           onChange={changed}
    //         />
    //         {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
    //         <label htmlFor={label}>{label}</label>
    //       </div>
    //     );
    //   })}
    // </form>

    <ButtonGroup className={styles.btns}>
      {props.options.map((u) => (
        <ToggleButton
          key={u.label}
          id={`radio-${u.label}`}
          type="radio"
          variant="secondary"
          name="radio"
          value={u.label}
          checked={props.value === u.label}
          onChange={(e) => changed(e)}
        >
          {u.label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export default RadioButtons;
