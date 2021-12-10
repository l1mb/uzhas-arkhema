import { useEffect, useState } from "react";
import Categories from "./categories/categories";
import styles from "./style.module.scss";

function Products() {
  const catData = ["all", "dlya bichey", "chisto multiki", "poigrat'"];

  const [categorie, setCategorie] = useState(catData[0].toUpperCase());
  useEffect(() => {}, [categorie]);
  return (
    <div className={styles.extraDiv}>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>
          <h3 className={styles.header}>Прокат ноутбуков в Минске</h3>
          <div className={styles.categories}>
            {catData.map((elem) => (
              <Categories label={elem.toUpperCase()} setValue={(e: string) => setCategorie(e)} selected={categorie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
