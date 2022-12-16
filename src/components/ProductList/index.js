import React from "react";
import Product from "../Product";
import "./ProductList.scss";
import { Link } from "react-router-dom";

export default function ProductList({products}) {

  return (
    <div className="product-list">
      {products.map((product) => (
        <Link to={`/${product.id}`} key={product.id}>
          <Product product={product} />
        </Link>
      ))}
    </div>
  );
}
