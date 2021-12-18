import React from "react";
import { Label } from "@mui/icons-material";
import { useSelector } from "react-redux";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import styles from "./style.module.scss";
import roles from "@/types/constants/roles/roles";
import StateType from "@/redux/types/stateType";

interface MNFR {
  mnfr: mnfrReadDto;
}

interface yj {
  role: string;
  text: string;
  id: number;
}

function Новость(prop: yj) {
  return (
    <div>
      <p>{prop.text}</p>
      {prop.role === roles.admin && (
        <div>
          <button>Create</button>
          <button>Delete</button>
          <button>Update</button>
        </div>
      )}
    </div>
  );
}

function SingleMnfr(props: MNFR) {
  const role = useSelector<StateType, string>((state) => state.role);

  return (
    <div className={styles.wrapper}>
      <Label>{props.mnfr.name}</Label>
      {props.mnfr.news.map((elem) => (
        <Новость role={role} text={elem.news} id={elem.id} />
      ))}
    </div>
  );
}

export default SingleMnfr;
