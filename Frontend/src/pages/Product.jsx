import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/showProduct/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:8080/api/products`)
      .then((response) => {
        const others = response.data.filter((p) => p._id !== id).slice(0, 8);
        setRecommendations(others);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="bg-inkporabg min-h-screen px-4 sm:px-8 md:px-16 py-12">
      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-30 gap-12 mb-20">
        {/* Image */}
        <div className="flex justify-center items-center bg-inkporaFrame border border-gray-200 shadow-sm h-96 w-80 sm:w-96 hover:shadow-md transition-all">
          <img
            src={product.productImage}
            alt={product.title}
            className="h-full w-full p-3  hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div className="max-w-md text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-dancingscript text-black mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-800 mb-2">
            ₹{product.price}
          </p>

          {product.detail && (
            <p className="text-sm text-gray-500 mb-4">{product.detail}</p>
          )}

          {product.category && (
            <p className="text-sm text-gray-500 mb-6">
              Category: {product.category}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="flex items-center justify-center gap-2 bg-inkporaPink text-black px-6 py-3 rounded-full hover:bg-pink-500 hover:text-white transition-all">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>

            <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-100 transition-all">
              <CreditCard className="w-5 h-5" /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-dancingscript text-black mb-6 text-center">
            You may also like
          </h2>

          {/* Carousel */}
          <div className="relative w-full mt-8 max-w-7xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {recommendations.slice(0, 8).map((item) => (
                  <Link
                    to={`/products/${item._id}`}
                    key={item._id}
                    className="flex-[0_0_70%] sm:flex-[0_0_50%] md:flex-[0_0_33.3%] lg:flex-[0_0_25%] px-2"
                  >
                    <div className="bg-inkporaFrame px-1 py-10 text-center transition-all hover:shadow-md">
                      <img
                        src={item.productImage}
                        alt={item.title}
                        className="w-full h-60 sm:h-60 md:h-60 lg:h-70  xl:h-80  px-4"
                      />
                      <div className="flex flex-row justify-between w-full px-4 mt-3">
                        <h3 className="font-medium font-poppins text-gray-800">
                          {item.title}
                        </h3>
                        <h3 className="font-medium font-poppins text-gray-800">
                          ₹{item.price}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Carousel Arrows */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-md p-2 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-md p-2 rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
