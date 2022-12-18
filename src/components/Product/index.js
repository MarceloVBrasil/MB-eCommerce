import React from "react";
import "./Product.scss";
import { priceTag } from "../../utils/priceTag";

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
        <p className="product-info__price">{priceTag(product.price)}</p>
      </div>
    </div>
  );
}
