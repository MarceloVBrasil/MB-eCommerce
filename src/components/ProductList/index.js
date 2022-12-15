import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Product from "../Product";
import "./ProductList.scss";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="product-list">
      {products.map((product) => (
        <Link to={`/${product.id}`} key={product.id}>
          <Product product={product} />
        </Link>
      ))}
    </div>
  );

  async function getAllProducts() {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
    } catch (error) {
      alert(error);
    }
  }
}
