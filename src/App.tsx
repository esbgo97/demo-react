import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductList from "./products/ProducList";
import ProductForm from "./products/ProductsForm";
import Cart from "./cart/Cart";

function App() {
  return (
    <div className="App">
      <ProductList></ProductList>
      <ProductForm />
      <Cart />
    </div>
  );
}

export default App;
