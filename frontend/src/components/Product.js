import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <div>
      <Card className="p-3 my-3 rounded">
        <Link to={`/product/${product._id}`}>

            <Card.Img
              src={product.image}
              style={{objectFit:'contain',minHeight:'100%',maxHeight:'100%'}}
            />

        </Link>
        <Card.Body>
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: "none" }}
          >
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <p style={{ marginBottom: "5px" }}>
              Компания : {product.brand.name} Категория : {product.category.name}
            </p>
          </Card.Text>
          <Card.Text as="div">
            <Rating
              style={{ margin: "0" }}
              rating={product.rating}
              numReviews={product.numReviews}
            />
          </Card.Text>
          <Card.Text as="div">
            <h3 style={{ padding: "0", margin: "0" }}>${product.price}</h3>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
