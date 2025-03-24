import React, { useContext, useState } from "react";
import { ProductContext } from "../Utils/Context";
import "nanoid";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  let [products, setproducts] = useContext(ProductContext);
  let navigate = useNavigate();
  let [image, setImage] = useState("");
  let [title, setTitle] = useState("");
  let [price, setPrice] = useState("");
  let [category, setCategory] = useState("");
  let [description, setDescription] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (
      image.trim().length < 4 ||
      title.trim().length < 4 ||
      price.trim().length < 1 ||
      category.trim().length < 4 ||
      description.trim().length < 4
    ) {
      alert("All fields must be filled out with at least 4 characters.");
      return;
    }
    let product = {
      id: nanoid(),
      image,
      title,
      price,
      category,
      description,
    };
    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    toast.success("Product Added Successfully ...");
    navigate("/");
  };

  return (
    <form
      onSubmit={HandleSubmit}
      className="w-screen h-screen flex gap-3 flex-col items-center justify-center p-[5%] "
    >
      <h1 className="text-2xl max-sm:w-[90%]  w-1/2 font-semibold">
        Add New Product
      </h1>
      <input
        className="w-1/2 max-sm:w-[90%] bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
        type="url"
        placeholder="Product URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        className="w-1/2 max-sm:w-[90%] bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex justify-between w-1/2 max-sm:w-[90%]">
        <input
          className="w-[48%] bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
          type="Number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="w-[48%] bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
          type="text"
          placeholder="Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <textarea
        className="w-1/2 max-sm:w-[90%]  bg-zinc-200 p-3 rounded-lg text-lg font-semibold"
        rows="8"
        placeholder="Product Description ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        className="w-1/2 max-sm:w-[90%] bg-blue-600 hover:bg-blue-700 p-3 text-zinc-200 rounded-lg text-lg font-semibold"
        type="submit"
      >
        Create New Product
      </button>
    </form>
  );
}

export default Create;
