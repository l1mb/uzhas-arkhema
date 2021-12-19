/* eslint-disable react/require-default-props */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "@/elements/home/labelElement/label";
import ImagePicker from "@/elements/home/productCardElement/editImagePicker/imagePicker";
import EditInputElement from "@/elements/home/productCardElement/editInputs/editInputElement";
import detectParameterType from "@/helpers/basic/detectParameters";
import ProductActions from "@/redux/actions/products/productActionTypes";
import ProductInteractions from "@/redux/actions/products/productInterator";
import editData from "@/types/constants/adminModals/editGame";
import modalType from "./modalType";
import styles from "./editProduct.module.scss";
import { updateProductDto } from "@/api/types/newProduct/cuProductDto";
import { readProductDto } from "@/api/types/newProduct/rProductDto";
import getOptions from "@/api/httpService/tokenedOptions";
import StateType from "@/redux/types/stateType";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import productsApi from "@/api/httpService/products/productsApi";

interface EditProps {
  editableProduct?: readProductDto;
  setDeletable?: (e: { name: string; id: number }) => void;
  setOpenCheck?: (e: boolean) => void;
  setOpen: (e: boolean) => void;
  providedModalType: string;
}

function EditProduct(props: EditProps) {
  const { editableProduct, setDeletable, setOpenCheck, setOpen, providedModalType } = props;

  const [pickUpData, setPickUpData] = useState<{ id: number; name: string }[]>([]);
  const [mnfrData, setMnfrData] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const p = await productsApi.apiGetPickUps();
      const m = await productsApi.apiGetMnfrs();

      setPickUpData(p);
      setMnfrData(m);
    }
    fetchData();
  }, []);

  const defaultValue: updateProductDto = {
    id: editableProduct?.id,
    name: editableProduct?.name,
    price: editableProduct?.price,
    description: editableProduct?.description,
    mnfrId: mnfrData.length>0 ? mnfrData[0].id : 0,
    pickUpId: pickUpData.length>0 ? pickUpData[0].id : 0,
    shape: editableProduct?.shape,
  } as updateProductDto;

  const [updateDto, setUpdateDto] = useState<updateProductDto>({
    ...editableProduct,
    ...defaultValue,
  });

  const dispatch = useDispatch();

  const setValue = (parameter: string | number | Date, name: string) => {
    setUpdateDto((prevState) => ({
      ...prevState,
      [name]: parameter,
    }));
  };

  const setUnusualValue = (parameter: File, name: string) => {
    setUpdateDto((prevState) => ({
      ...prevState,
      [name]: parameter,
    }));
  };

  console.log(
    `keys ${JSON.stringify({
      ...editableProduct,
      ...defaultValue,
    })}`
  );

  const EditData: { label: string; type: string; name: string; default?: string | number }[] = Object.keys(updateDto)
    .filter((m) => !editData.ignoredProps.includes(m))
    .map((elem) => {
      const data: { label: string; type: string; name: string; default?: string | number } = {
        label: elem.toString().toUpperCase(),
        type: detectParameterType(elem),
        name: elem,
      };
      if (editableProduct) {
        data.default = editableProduct[data.name as keyof readProductDto] as string | number;
      }
      return data;
    });

  const sendImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("logo", updateDto.logo);
    const linkISuppose = await fetch(
      "https://api.cloudinary.com/v1_1/dbu4voh2q/upload",
      getOptions("POST", false, formData)
    );
    return linkISuppose;
  };

  const buildFormData = (): FormData => {
    sendImageToCloudinary();
    const data = new FormData();
    Object.keys(updateDto).forEach((key) =>
      data.append(key, updateDto[key as keyof typeof updateDto] as string | Blob)
    );
    return data;
  };

  const handleRemoveClick = () => {
    if (updateDto.id && editableProduct && setDeletable) {
      setDeletable({ id: updateDto.id, name: editableProduct.name });
    }
    setOpen(false);
    if (setOpenCheck) {
      setOpenCheck(true);
    }
  };

  const handleCreateClick = () => {
    dispatch(ProductInteractions(ProductActions.CREATE, buildFormData()));
    setOpen(false);
  };

  const handleUpdateClick = () => {
    dispatch(ProductInteractions(ProductActions.UPDATE, buildFormData()));

    setOpen(false);
  };

  return (
    <div className={styles.modalWrapper}>
      <Label
        content={providedModalType === modalType.UPDATE ? `Edit card with id ${updateDto.id}` : `Create a new product`}
      />
      <div className={styles.inputs}>
        {EditData.map((element) => (
          <EditInputElement
            key={element.label}
            label={element.label}
            setValue={(e) => setValue(e, element.name)}
            type={element.type}
            name={element.name}
            defaultValue={element.default}
          />
        ))}

        {editData.fileInputs.map((elem) => (
          <ImagePicker key={elem} label={elem} setValue={(e) => setUnusualValue(e, elem.toLowerCase())} />
        ))}
      </div>
      <div className={styles.buttons}>
        {providedModalType === modalType.UPDATE ? (
          <>
            <button type="button" onClick={handleUpdateClick}>
              Update
            </button>
            <button
              type="button"
              onClick={() => {
                handleRemoveClick();
                setOpen(true);
              }}
            >
              Delete
            </button>
          </>
        ) : (
          <button type="button" onClick={handleCreateClick}>
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default EditProduct;
