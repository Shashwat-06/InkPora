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
    <div className="bg-inkporabg min-h-screen py-12">
      <h1 className="text-4xl font-dancingscript text-center mb-12 text-black">
        Our Pen Collection
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <Products key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pens;
