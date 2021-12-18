/* eslint-disable react/require-default-props */
import { useState } from "react";
import { useDispatch } from "react-redux";
import Label from "@/elements/home/labelElement/label";
import EditInputElement from "@/elements/home/productCardElement/editInputs/editInputElement";
import ProductActions from "@/redux/actions/news/newsActionTypes";
import ProductInteractions from "@/redux/actions/products/productInterator";
import modalType from "./modalType";
import styles from "./editProduct.module.scss";
import news from "@/types/interfaces/news/news";

interface EditProps {
  editableNews?: news;
  setDeletable?: (e: { name: string; id: number }) => void;
  setOpenCheck?: (e: boolean) => void;
  setOpen: (e: boolean) => void;
}

function EditNews(props: EditProps) {
  const [asd, setnews] = useState<news>(props.editableNews as news);

  const [новость, setНовость] = useState<string>(props.editableNews?.news as string);
  const dispatch = useDispatch();

  const setValue = (parameter: string) => {
    setНовость(parameter);
  };

  const handleCreateClick = () => {
    dispatch(ProductInteractions(ProductActions.CREATE, buildFormData()));
    props.setOpen(false);
  };

  const handleUpdateClick = () => {
    dispatch(ProductInteractions(ProductActions.UPDATE, buildFormData()));

    props.setOpen(false);
  };

  return (
    <div className={styles.modalWrapper}>
      <Label
        content={providedModalType === modalType.UPDATE ? `Edit card with id ${updateDto.id}` : `Create a new product`}
      />
      <div className={styles.inputs}>
        <EditInputElement
          label="News"
          setValue={(e) => setValue(e, element.name)}
          type={element.type}
          name={element.name}
          defaultValue={element.default}
        />
      </div>
      <div className={styles.buttons}>
        {providedModalType === modalType.UPDATE ? (
          <button type="button" onClick={handleUpdateClick}>
            Update
          </button>
        ) : (
          <button type="button" onClick={handleCreateClick}>
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default EditNews;
