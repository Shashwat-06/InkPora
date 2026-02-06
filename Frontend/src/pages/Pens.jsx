import axios from "axios";
import { useEffect, useState } from "react";
import Products from "../components/Products.jsx";
import api from "../api/axios.js";

function Pens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-inkporabg min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 py-10">
      <h1 className="text-4xl font-dancingscript text-center mb-12 text-black">
        Our Pen Collection
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((item) => (
            <Products key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Pens;
