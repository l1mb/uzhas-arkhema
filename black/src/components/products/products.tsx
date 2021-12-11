import { useEffect, useState } from "react";
import Categories from "./categories/categories";
import FilterBar from "./FilterBar/filter";
import ProductCard, { ProductCardProps } from "./productCard/productCard";
import styles from "./style.module.scss";

function Products() {
  const catData = ["all", "dlya bichey", "chisto multiki", "poigrat'"];
  const [categorie, setCategorie] = useState(catData[0].toUpperCase());

  const data: ProductCardProps[] = [
    { label: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  ];

  useEffect(() => {
    // TODO: fetch data
  }, [categorie]);
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

          <div className={styles.contentRow}>
            <div>
              <FilterBar setQuery={(e: string) => {}} categorie={categorie} />
            </div>
            <div className={styles.cards}>
              {data.map((elem) => (
                <ProductCard label={elem.label} price={elem.price} shortDescription={elem.shortDescription} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
