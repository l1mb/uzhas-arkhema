import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import useProductFetcher from "@/hooks/loader/loader";
import Categories from "./categories/categories";
import FilterBar from "./FilterBar/filter";
import ProductCard from "./productCard/productCard";
import styles from "./style.module.scss";
import BtEditModal from "../modalComponent/btEditModal/editModal";
import productsApi from "@/api/httpService/products/productsApi";
import DeleteModal from "../modalComponent/btEditModal/deleteModal";
import QueryParams from "@/types/interfaces/filter/queryParams";
import StateType from "@/redux/types/stateType";
import SearchBar from "@/elements/home/searchBarElement/searchBar";
import { updateProductDto } from "@/api/types/newProduct/productUpdateDto";

const mockData: updateProductDto[] = [
  { id: 1, categoryId: 1, vendorId: 3, name: "Acer aspire", description: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
  {
    id: 2,
    categoryId: 1,
    vendorId: 3,
    name: "Acer aspired",
    description: "nu zaebis noutbuk, nu ohuenniy",
    price: 750,
  },
  {
    id: 3,
    categoryId: 1,
    vendorId: 3,
    name: "Acer aspider",
    description: "nu zaebis noutbuk, nu ohuenniy",
    price: 750,
  },
  {
    id: 4,
    categoryId: 1,
    vendorId: 3,
    name: "Acer aspidero",
    description: "nu zaebis noutbuk, nu ohuenniy",
    price: 750,
  },
  {
    id: 5,
    categoryId: 1,
    vendorId: 3,
    name: "Acer aspidore",
    description: "nu zaebis noutbuk, nu ohuenniy",
    price: 750,
  },
  {
    id: 6,
    categoryId: 1,
    vendorId: 3,
    name: "Acer aspidor",
    description: "nu zaebis noutbuk, nu ohuenniy",
    price: 750,
  },
  { id: 7, categoryId: 1, vendorId: 3, name: "Acer spidor", description: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
  { id: 8, categoryId: 1, vendorId: 3, name: "Acer pidor", description: "nu zaebis noutbuk, nu ohuenniy", price: 750 },
];

interface ProductItem {
  id: number;
  name: string;
  description: string;
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
            id={item.id}
          />
        ))}
    </div>
  );
}

interface paginatedProps {
  pagesCount: number;
  itemsPerPage: number;
  setMode: (e: string) => void;
  setProduct: (e: updateProductDto) => void;
  params: QueryParams | undefined;
  setParams: (e: QueryParams) => void;
  data: updateProductDto[];
}

function PaginatedItems(props: paginatedProps) {
  const { itemsPerPage } = props;
  // We start with an empty list of items.
  const [data, setData] = useState<updateProductDto[]>(mockData);

  const [currentItems, setCurrentItems] = useState(data);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    console.log("Nice to see you. Have a good day");
  }, [itemOffset, itemsPerPage, props.data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event, page) => {
    const t = props.params;
    if (t) {
      t.limit = itemsPerPage;
      t.offset = itemsPerPage * page;
      props.setParams({ ...t });
    }
  };

  return (
    <>
      <Items currentItems={data} setMode={props.setMode} setProduct={props.setProduct} key={data} />

      <Pagination count={props.pagesCount} onChange={handlePageClick} variant="outlined" color="primary" />
    </>
  );
}
function Products() {
  const catData = ["all", "dlya bichey", "chisto multiki", "poigrat'"];
  const [categorie, setCategorie] = useState(catData[0].toUpperCase());
  const { loading, setParams, params } = useProductFetcher();
  const [isOpen, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [product, setProduct] = useState<updateProductDto>();
  const [pagesCount, setPagesCount] = useState<number>(1);

  const data = useSelector<StateType, updateProductDto[]>((state) => state.Products);
  const handleSave = async (e: updateProductDto) => {
    const response = await productsApi.postProduct(e);
    if (response.status === 201) {
      toast.success("Yay");
    } else {
      toast.error("Paru");
    }
  };
  const handleUpdate = async (e: updateProductDto) => {
    const response = await productsApi.putProduct(e);
    if (response.status === 201) {
      toast.success("Yay");
    } else {
      toast.error("Paru");
    }
  };

  useEffect(() => {
    async function getCount() {
      const res = await productsApi.apiGetCount();
      if (res) {
        setPagesCount(res);
      } else {
        console.log("ne robit");
      }
    }

    getCount();
  }, []);
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
                pagesCount={pagesCount}
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
        key={product}
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
