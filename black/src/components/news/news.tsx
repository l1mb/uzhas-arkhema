import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import news from "@/api/httpService/news/news";
import SingleMnfr from "./singleMnfr";
import getMockNews from "@/data/news/getMockNews";
import Modal from "../modalComponent/modalComponent/modal";
import EditNews from "../modalComponent/editProductModal/editNews";
import modalType from "../modalComponent/editProductModal/modalType";

function News() {
  const [data, setData] = useState<mnfrReadDto[]>(getMockNews);
  const [open, setOpen] = useState(false);
  const [modal, setModalType] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      const res = await news.getnews();
      setData(res);
    }

    fetchData();
  }, []);

  const handleUpdate = (id: number) => {
    console.log(`update news ${id}`);
    setModalType(modalType.UPDATE);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log(`delete news ${id}`);
  };

  const handleCreate = () => {
    setModalType(modalType.CREATE);
    setOpen(true);
  };

  const handlers = {
    handleCreate,
    handleDelete,
    handleUpdate,
  };

  return (
    <div className={styles.extraDiv}>
      <div className={styles.page_wrapper}>
        <div className={styles.page_content}>
          <div className={styles.body}>
            {data && data.map((elem) => <SingleMnfr handlers={handlers} key={elem.id} mnfr={elem} />)}
          </div>
        </div>
      </div>
      <Modal isOpen={open} setOpen={setOpen}>
        <EditNews setOpen={setOpen} providedModalType={modal} />
      </Modal>
    </div>
  );
}

export default News;
