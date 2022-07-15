import { ChangeEvent, FormEvent, ReactComponentElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addProduct, addProductAsync, getErrorMessageSelector, Product } from "./products.slice";

interface ProductFormProps {}

const ProductForm: React.FC<ProductFormProps> = ({}) => {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(getErrorMessageSelector)

  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    price: 0,
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) =>
    setProduct((prev) => {
      (prev as any)[name] = value;
      const newValue = { ...prev };
      return newValue;
    });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(product);
    dispatch(addProductAsync(product));
  };

  const { id, title, price } = product;
  return (
    <>
      <h2>Add Product To Store</h2>
      {errorMessage}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={price}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Id"
          name="id"
          value={id}
          onChange={handleChange}
        />
        <button type="submit">Add product</button>
      </form>
    </>
  );
};

export default ProductForm;
