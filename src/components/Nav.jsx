import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../Utils/Context";

function Nav() {
  let [products] = useContext(ProductContext);
  let UniqueCategory =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  UniqueCategory = [...new Set(UniqueCategory)];
  // console.log(UniqueCategory);

  return (
    <nav className="xl:w-[20%] max-sm:w-[35%] max-sm:bg-zinc-200  h-full  font-semibold flex flex-col gap-5 items-center ">
      <Link
        className="px-[2vw] py-[.6vw] max-sm:text-center  max-sm:text-xs border-2 mt-15"
        to="/create"
      >
        Add New Product
      </Link>
      <h1 className="w-[80%] max-sm:w-full max-sm:text-sm max-sm:font-bold text-2xl">
        Filter Category
      </h1>
      <div className="w-[80%] max-sm:w-full max-sm:text-xs flex flex-col ">
        {UniqueCategory.map((category, idx) => (
          <Link
            to={`?category=${category}`}
            key={idx}
            className="hover:bg-zinc-200 max-sm:px-1 px-4 py-3 flex items-center justif-center"
          >
            <span className="w-[15px] h-[14px] bg-blue-500  rounded-full mr-3"></span>
            {category}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;
