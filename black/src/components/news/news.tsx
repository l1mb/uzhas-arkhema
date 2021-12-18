import { useEffect, useState } from "react";
import { companyName } from "@/types/constants/globals/theme";
import styles from "./style.module.scss";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import news from "@/api/httpService/news/news";
import SingleMnfr from "./singleMnfr";

function News() {
  const header = `Welcome to the ${companyName}`;

  const [data, setData] = useState<mnfrReadDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await news.getnews();
      setData(res);
    }

    fetchData();
  }, []);

  return (
    <div className={styles.extraDiv}>
      <div className={styles.page_wrapper}>
        <div className={styles.page_content}>
          <div className={styles.header}>{header.toUpperCase()}</div>
          <div className={styles.body}>{data && data.map((elem) => <SingleMnfr mnfr={elem} />)}</div>
        </div>
      </div>
    </div>
  );
}

export default News;
