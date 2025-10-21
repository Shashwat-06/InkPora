import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/showProduct/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex flex-row p-30">
      <div className=" flex bg-inkporaFrame h-110 w-110 justify-center items-center">
        <img
          src={product.productImage}
          alt="productImg"
          className="h-100 w-100"
        />
      </div>
      <div className="px-5">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>&#8377;{product.price}</p>
      </div>
    </div>
  );
}

export default Product;
