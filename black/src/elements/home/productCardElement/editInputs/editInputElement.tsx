/* eslint-disable jsx-a11y/label-has-associated-control */
import detectCallbackByType from "@/helpers/basic/detectCallbackByType";
import React from "react";
import styles from "./editElement.module.scss";

interface Props {
  label: string;
  setValue: (value: string | number | Date, name: string) => void;
  type: string;
  name: string;
  defaultValue?: string | number;
}

const EditInputElement: React.FC<Props> = (props) => {
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    props.setValue(detectCallbackByType(text, props.type), props.name);
  };

  return (
    <div className={styles.inputElement}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        type={props.type}
        name={props.label}
        id={props.label}
        onChange={onchange}
        defaultValue={props.defaultValue}
      />
    </div>
  );
};

export default EditInputElement;
