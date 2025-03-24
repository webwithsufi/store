import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../Utils/axios";
import Loading from "./Loading";
import { ProductContext } from "../Utils/Context";
function Details() {
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  let navigate = useNavigate();

  const HandleDelte = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setproducts(FilteredProducts);
    console.log(FilteredProducts);

    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    navigate("/");
  };

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setproduct(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    if (products.length > 0) {
      setproduct(products.find((p) => p.id == id));
    }
  }, [id, products]);

  return product ? (
    <div className="w-[80%] max-sm:w-[95%] h-full container  m-auto flex justify-between items-center p-[4%]  ">
      <img
        className="w-[40%] h-full max-sm:h-[80%]  "
        src={product.image}
        alt=""
      />
      <div className="w-[55%] h-[90%] max-sm:h-[80%] flex flex-col justify-center   gap-5 mt-[5%] font-semibold">
        <h1 className="text-xl max-sm:text-lg ">{product.title}</h1>
        <h2 className="">{product.price} $</h2>
        <h3 className="">{product.category}</h3>
        <p className="max-sm:text-xs">{product.description}</p>
        <div className="flex gap-5 max-sm:text-xs ">
          <Link
            to={`/edit/${product.id}`}
            className="px-8 max-sm:px-4  py-2 border-green-600 border-2 text-green-600 "
          >
            Edit
          </Link>
          <button
            onClick={(e) => HandleDelte(product.id)}
            className="px-8 max-sm:px-4  py-2  border-red-600 border-2 text-red-600 "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
