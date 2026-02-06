import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { AuthContext } from "../context/AuthContext";

function Product() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const addToCart = async () => {
    try {
      if (!user) return navigate("/login");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        { productId: id },
        { withCredentials: true },
      );
      navigate("/cart");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/showProduct/${id}`)
      .then((res) => setProduct(res.data));

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) =>
        setRecommendations(res.data.filter((p) => p._id !== id).slice(0, 8)),
      );
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="bg-inkporabg min-h-screen py-12 px-4 sm:px-8">
      {/* PDP */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* IMAGE */}
        <div className="bg-inkporaFrame overflow-hidden">
          <div className="aspect-[4/5]">
            <img
              src={product.productImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-dancingscript text-black">
            {product.title}
          </h1>

          <p className="text-gray-600">{product.description}</p>

          <p className="text-2xl font-semibold text-gray-800">
            ₹{product.price}
          </p>

          {product.category && (
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
          )}

          <button
            onClick={addToCart}
            className="mt-6 w-full sm:w-fit flex items-center justify-center gap-2 bg-inkporaPink text-black px-8 py-3 rounded-full hover:bg-pink-500 hover:text-white transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-dancingscript text-center mb-8">
            You may also like
          </h2>

          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {recommendations.map((item) => (
                  <Link
                    key={item._id}
                    to={`/products/${item._id}`}
                    className="flex-[0_0_70%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-3"
                  >
                    <div className="bg-inkporaFrame transition hover:shadow-md">
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={item.productImage}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="px-3 py-3 flex justify-between text-sm">
                        <span className="line-clamp-1">{item.title}</span>
                        <span>₹{item.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
