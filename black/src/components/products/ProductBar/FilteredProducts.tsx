import React from "react";
import ProductCard from "@/elements/home/productCardElement/productCard";
import { updateProductDto } from "@/api/types/newProduct/cuProductDto";

interface ProductProps {
  products: updateProductDto[];
}

const FilteredProducts: React.FC<ProductProps> = React.memo((props) => (
  <>
    {props.products.map((u) => (
      <React.Fragment key={u.id}>
        <ProductCard key={u.name} product={u} />
      </React.Fragment>
    ))}
  </>
));
export default FilteredProducts;
