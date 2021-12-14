import { useEffect, useState } from "react";
import { Dropdown, Dropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import useProductFetcher from "@/hooks/loader/loader";
import Categories from "./categories/categories";
import FilterBar from "./FilterBar/filter";
import ProductCard from "./productCard/productCard";
import styles from "./style.module.scss";
import BtEditModal from "../modalComponent/btEditModal/editModal";
import productsApi from "@/api/httpService/products/productsApi";
import DeleteModal from "../modalComponent/btEditModal/deleteModal";

interface ProductItem {
  id: number;
  label: string;
  shortDescription: string;
  price: string;
}
interface itemsProps {
  setMode: (e: string) => void;
  setProduct: (e: updateProductDto) => void;
  currentItems: ProductItem[] | null;
}

function Items(props: itemsProps) {
  const { currentItems } = props;
  return (
    <div className={styles.cards}>
      {currentItems &&
        currentItems.map((item) => (
          <ProductCard
            key={item.label}
            label={item.label}
            price={item.price}
            setMode={props.setMode}
            setProduct={props.setProduct}
            shortDescription={item.shortDescription}
            id={item.id}
          />
        ))}
    </div>
  );
}

interface paginatedProps {
  itemsPerPage: number;
  setMode: (e: string) => void;
  setProduct: (e: updateProductDto) => void;
}

function PaginatedItems(props: paginatedProps) {
  const { itemsPerPage } = props;
  // We start with an empty list of items.
  const data: ProductItem[] = [
    { id: 1, label: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { id: 2, label: "Acer aspired", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { id: 3, label: "Acer aspider", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { id: 4, label: "Acer aspidero", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { id: 5, label: "Acer aspidore", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { id: 6, label: "Acer aspidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { id: 7, label: "Acer spidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { id: 8, label: "Acer pidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  ];

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} setMode={props.setMode} setProduct={props.setProduct} key={currentItems} />

      <ReactPaginate
        className={styles.pag_buttons}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
function Products() {
  const catData = ["all", "dlya bichey", "chisto multiki", "poigrat'"];
  const [categorie, setCategorie] = useState(catData[0].toUpperCase());
  const { loading, setParams } = useProductFetcher();

  const [isOpen, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [product, setProduct] = useState();

  const handleSave = async (e: updateProductDto) => {
    const response = await productsApi.postProduct(e);
    if (response.status === 201) {
      toast.success("Yay");
    } else {
      toast.error("Paru");
    }
  };
  const handleUpdate = async (e: updateProductDto) => {
    console.log(e);
    const response = await productsApi.putProduct(e);
    if (response.status === 201) {
      toast.success("Yay");
    } else {
      toast.error("Paru");
    }
  };

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
              <Categories
                key={elem}
                label={elem.toUpperCase()}
                setValue={(e: string) => setCategorie(e)}
                selected={categorie}
              />
            ))}
            <Dropdown.Divider />
          </div>

          <div className={styles.contentRow}>
            <div className={styles.filter}>
              <FilterBar
                setMode={() => {
                  setMode("create");
                }}
                setOpen={setOpen}
                setQuery={setParams}
                categorie={categorie}
              />
            </div>

            <div className={styles.pagination}>
              <PaginatedItems
                setMode={(e: string) => {
                  setMode(e);
                  setOpen(true);
                }}
                setProduct={(e: updateProductDto) => {
                  setProduct(e);
                }}
                itemsPerPage={6}
              />
            </div>
          </div>
        </div>
      </div>
      <BtEditModal
        isOpen={isOpen}
        mode={mode}
        save={handleSave}
        product={product}
        update={handleUpdate}
        setOpen={setOpen}
      />
      {product && (
        <DeleteModal
          mode={mode}
          id={product.id}
          show={isOpen}
          setClose={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Products;
