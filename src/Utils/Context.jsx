import React, { createContext, useEffect, useState } from "react";
import axios from "./axios";

export let ProductContext = createContext();
function Context(props) {
  // JSON.parse(localStorage.getItem("products")) ||
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || null
  );

  // const getProducts = async () => {
  //   try {
  //     let { data } = await axios("/products");
  //     setProducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default Context;
