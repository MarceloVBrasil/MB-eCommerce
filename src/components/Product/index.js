import React from "react";
import "./Product.scss";

export default function Product({ product }) {
  return (
    <div className="product">
      <img
        src={product.image}
        alt={`${product.name} image`}
        title={product.name}
        className="product__image"
      />
      <div className="product-info">
        <p className="product-info__name">{product.name}</p>
        <p className="product-info__price">{`$${product.price}`}</p>
      </div>
    </div>
  );
}
