import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Utils/Context";
import "nanoid";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Edit() {
  let [products, setproducts] = useContext(ProductContext);
  let { id } = useParams();
  let navigate = useNavigate();
  const [product, setproduct] = useState({
    image: "",
    title: "",
    price: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const changeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (
      product.image.trim().length < 4 ||
      product.title.trim().length < 4 ||
      product.price.trim().length < 1 ||
      product.category.trim().length < 4 ||
      product.description.trim().length < 4
    ) {
      alert("All fields must be filled out with at least 4 characters.");
      return;
    }

    let ProductIndex = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[ProductIndex] = { ...products[ProductIndex], ...product };
    setproducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    toast.success("Product Edit Successfully");
    navigate(-1);
  };

  return (
    <form
      onSubmit={HandleSubmit}
      className="w-screen h-screen flex gap-3 flex-col items-center justify-center p-[5%] "
    >
      <h1 className="text-2xl w-1/2 max-sm:w-[90%] font-semibold">
        Edit Product
      </h1>
      <input
        className="w-1/2 max-sm:w-[90%] bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
        type="url"
        placeholder="Product URL"
        value={product && product.image}
        name="image"
        onChange={changeHandler}
      />
      <input
        className="w-1/2 max-sm:w-[90%] bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
        type="text"
        placeholder="Product Title"
        value={product && product.title}
        name="title"
        onChange={changeHandler}
      />
      <div className="flex justify-between w-1/2 max-sm:w-[90%]">
        <input
          className="w-[48%] bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
          type="Number"
          placeholder="Product Price"
          value={product && product.price}
          name="price"
          onChange={changeHandler}
        />
        <input
          className="w-[48%] bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
          type="text"
          placeholder="Product Category"
          value={product && product.category}
          name="category"
          onChange={changeHandler}
        />
      </div>
      <textarea
        className="w-1/2 max-sm:w-[90%]  bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
        rows="8"
        placeholder="Product Description ..."
        value={product && product.description}
        name="description"
        onChange={changeHandler}
      ></textarea>
      <button
        className="w-1/2 max-sm:w-[90%] bg-blue-600 hover:bg-blue-700 p-3 text-zinc-200 rounded-lg text-lg font-semibold"
        type="submit"
      >
        Edit Product
      </button>
    </form>
  );
}

export default Edit;
