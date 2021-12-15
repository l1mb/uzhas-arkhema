import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useProductFetcher from "@/hooks/loader/loader";
import Categories from "./categories/categories";
import FilterBar from "./FilterBar/filter";
import ProductCard from "./productCard/productCard";
import styles from "./style.module.scss";
import BtEditModal from "../modalComponent/btEditModal/editModal";
import productsApi from "@/api/httpService/products/productsApi";
import DeleteModal from "../modalComponent/btEditModal/deleteModal";
import IBasicProduct from "@/api/types/products/IBasicProduct";
import QueryParams from "@/types/interfaces/filter/queryParams";
import StateType from "@/redux/types/stateType";
import SearchBar from "@/elements/home/searchBarElement/searchBar";

const mockData: IBasicProduct[] = [
  { id: 1, company: "kok", name: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
  { id: 2, company: "kok", name: "Acer aspired", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
  { id: 3, company: "kok", name: "Acer aspider", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
  { id: 4, company: "kok", name: "Acer aspidero", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
  { id: 5, company: "kok", name: "Acer aspidore", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
  { id: 6, company: "kok", name: "Acer aspidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
  { id: 7, company: "kok", name: "Acer spidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
  { id: 8, company: "kok", name: "Acer pidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
];

interface ProductItem {
  id: number;
  name: string;
  shortDescription: string;
  price: string;
}
interface itemsProps {
  setMode: (e: string) => void;
  setProduct: (e: updateProductDto) => void;
  currentItems: updateProductDto[] | null;
}

function Items(props: itemsProps) {
  const { currentItems } = props;
  return (
    <div className={styles.cards}>
      {currentItems &&
        currentItems.map((item) => (
          <ProductCard
            product={item}
            key={item.name}
            label={item.name}
            price={item.price}
            setMode={props.setMode}
            setProduct={props.setProduct}
            shortDescription={item.description}
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
  params: QueryParams | undefined;
  setParams: (e: QueryParams) => void;
  data: IBasicProduct[];
}

function PaginatedItems(props: paginatedProps) {
  const { itemsPerPage } = props;
  // We start with an empty list of items.
  const [data, setData] = useState<IBasicProduct[]>(mockData);

  const [currentItems, setCurrentItems] = useState(data);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const t = props.params;
    if (t) {
      console.log(t);
      console.log(itemOffset);
      t.limit = itemsPerPage;
      t.offset = itemOffset;
      // console.log(`t:${JSON.stringify(t)}`);
      props.setParams(JSON.parse(JSON.stringify(t)));
    }
    if (props.data) {
      setData(data);
    }
  }, [itemOffset]);

  useEffect(() => {
    // Fetch items from another resources.
    const t = props.params;
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, props.data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={data} setMode={props.setMode} setProduct={props.setProduct} key={data} />

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
  const { loading, setParams, params } = useProductFetcher();
  const [isOpen, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [product, setProduct] = useState();

  const data = useSelector<StateType, IBasicProduct[]>((state) => state.Products);
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
          <SearchBar params={params} setParams={setParams} />
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
                data={data}
                params={params}
                setParams={setParams}
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
