import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  let { search, pathname } = useLocation();

  return (
    <div className="w-screen h-screen flex relative ">
      {(pathname != "/" || search.length > 0) && (
        <Link
          to="/"
          className="absolute left-[23%] mt-3 font-semibold underline"
        >
          Home
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
