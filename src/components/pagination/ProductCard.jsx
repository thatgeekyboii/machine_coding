import React from "react";

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img"></img>
      <span>{title}</span>
    </div>
  );
};

export default ProductCard;
