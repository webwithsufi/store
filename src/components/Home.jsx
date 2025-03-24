import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { ProductContext } from "../Utils/Context";
import Loading from "./Loading";
import axios from "../Utils/axios";

function Home() {
  let [products] = useContext(ProductContext);
  let { search } = useLocation();
  let category = decodeURIComponent(search.split("=")[1]);
  const [filterproduct, setfilterproduct] = useState(null);

  // const getProductCategory = async () => {
  //   try {
  //     let { data } = await axios.get(`products/category/${category}`);
  //     setfilterproduct(data);
  //     console.log(filterproduct);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!filterproduct || category == "undefined") setfilterproduct(products);
    if (category != "undefined")
      setfilterproduct(products.filter((p) => p.category == category));
  }, [category, products]);
  return products ? (
    <>
      <Nav />
      <div className="w-[80%] max-sm:w-[65%] flex flex-wrap gap-4 p-5 pt-[3%] overflow-x-hidden overflow-y-auto ">
        {filterproduct &&
          filterproduct.map((product, index) => (
            <Link
              key={index}
              to={`/details/${product.id}`}
              className="h-[35vh] max-sm:h-[25vh] mt-5 w-[18%] max-sm:w-[40%] shadow-xl border-zinc-100 border-2 rounded-lg  overflow-hidden"
            >
              <div
                className="h-[65%] w-full bg-contain bg-no-repeat bg-center hover:scale-105"
                style={{
                  backgroundImage: `url(${product.image})`,
                }}
              ></div>
              <h3 className="hover:text-blue-600 max-sm:text-xs w-full h-[35%] overflow-hidden px-2">
                {product.title}
              </h3>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
