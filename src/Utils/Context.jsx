import React, { createContext, useEffect, useState } from "react";
import axios from "./axios";

export let ProductContext = createContext();

function Context(props) {
  const [products, setProducts] = useState(null);

  // Load products from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      getProducts();
    }
  }, []);

  // Fetch products from API
  const getProducts = async () => {
    try {
      let { data } = await axios.get("/products");
      setProducts(data);
      localStorage.setItem("products", JSON.stringify(data)); // Save to localStorage
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Update localStorage when products change
  useEffect(() => {
    if (products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default Context;
