import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/`)
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="bg-inkporabg">
      {/* Hero */}
      <div className="relative px-4 sm:px-8 lg:px-24">
        <img src="/assets/smPoster1.png" className="md:hidden w-full" />
        <img src="/assets/lgPoster.png" className="hidden md:block w-full" />

        <Link
          to="/pens"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-inkporabg px-6 py-2 shadow-md hover:bg-inkporaFrame transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto mt-16 px-4">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {products.slice(0, 5).map((item) => (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="flex-[0_0_70%] sm:flex-[0_0_33.33%] px-3"
              >
                <div className="bg-inkporaFrame p-4">
                  <img
                    src={item.productImage}
                    alt={item.title}
                    className="w-full h-64 object-contain"
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{item.title}</span>
                    <span>₹{item.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollNext}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Home;
