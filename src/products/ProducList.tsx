import { useState } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../cart/cart.slice";
import { useAppDispatch } from "../store/hooks";
import { getProductsSelector, Product, removeProduct, selectAllProducts } from "./products.slice";

interface ProductListProps {}
const ProductList: React.FC<ProductListProps> = ({}) => {
  const products = useSelector(selectAllProducts);
  const dispatch = useAppDispatch();

  const removeFromStore = (id: string) => {
    dispatch(removeProduct(id));
  };

  const addItemToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <div>
      <label>Products List</label>
      {products.map((product, i) => (
        <div key={i}>
          <span>
            {product.title} : {product.price}
          </span>
          <button onClick={() => removeFromStore(product.id)}>Remove</button>
          <button onClick={() => addItemToCart(product)}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
