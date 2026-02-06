// import axios from "axios";
// import { useEffect, useState } from "react";
// import Products from "../components/Products.jsx";
// import api from "../api/axios.js";

// function Pens() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get(`/api/products`)
//       .then((response) => {
//         setProducts(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log("Error fetching products:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-inkporabg min-h-screen py-12">
//       <h1 className="text-4xl font-dancingscript text-center mb-10 text-black">
//         Our Pen Collection
//       </h1>

//       {/* CENTERED CONTAINER */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         {products.length === 0 ? (
//           <p className="text-center text-gray-500">
//             No products available yet.
//           </p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((item) => (
//               <Products key={item._id} item={item} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Pens;
import axios from "axios";
import { useEffect, useState } from "react";
import Products from "../components/Products.jsx";
import api from "../api/axios.js";

const PRODUCTS_PER_PAGE = 8;

function Pens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <div className="bg-inkporabg min-h-screen py-12">
      <h1 className="text-4xl font-dancingscript text-center mb-10 text-black">
        Our Pen Collection
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {currentProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available yet.
          </p>
        ) : (
          <>
            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((item) => (
                <Products key={item._id} item={item} />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-40"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border rounded ${
                      currentPage === i + 1 ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Pens;
