import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Products from "../components/Products.jsx";

function Pens() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="mx-35 grid grid-cols-4 gap-0.5 justify-evenly">
        {product.map((item) => {
          return <Products key={item._id} item={item} />;
        })}
      </div>
    </>
  );
}

export default Pens;
