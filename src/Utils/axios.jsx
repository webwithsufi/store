import axios from "axios";

let instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

export default instance;
