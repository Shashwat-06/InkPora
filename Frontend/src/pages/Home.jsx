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
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col bg-inkporabg">
      {/* HERO SECTION */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <img src="/assets/smPoster1.webp" className="md:hidden w-full" />
        <img src="/assets/lgPoster.webp" className="hidden md:block w-full" />

        <Link
          to="/pens"
          className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 bg-inkporabg text-black font-light px-6 py-2 shadow-md hover:bg-inkporaFrame hover:text-gray-800 transition-all duration-300 h-10 lg:text-3xl lg:h-16 flex items-center"
        >
          Shop Now
        </Link>
      </div>

      {/* PRODUCT CAROUSEL */}
      <div className="relative w-full mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {products.slice(0, 5).map((item) => (
                <Link
                  to={`/products/${item._id}`}
                  key={item._id}
                  className="flex-[0_0_70%] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-3"
                >
                  <div className="bg-inkporaFrame transition hover:shadow-md">
                    {/* RECTANGULAR IMAGE (same as Pens/Product) */}
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={item.productImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* TEXT */}
                    <div className="px-3 py-3 flex justify-between items-start text-sm font-medium font-poppins">
                      <h3 className="line-clamp-1">{item.title}</h3>
                      <h3 className="whitespace-nowrap">₹{item.price}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={scrollPrev}
            className="hidden sm:flex absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={scrollNext}
            className="hidden sm:flex absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* SOCIAL SECTION */}
      <div className="bg-inkporabg mt-20 w-full flex flex-col items-center py-20">
        <h2 className="font-dancingscript text-4xl font-light mb-8 text-center">
          Follow us @inkPora
        </h2>

        <div className="flex flex-wrap justify-center gap-6 w-[90%] max-w-5xl">
          <img
            src="/assets/poster1.webp"
            alt="poster"
            className="shadow-2xl rounded-2xl object-cover w-72 h-72"
          />
          <img
            src="/assets/poster2.webp"
            alt="poster"
            className="shadow-2xl rounded-2xl object-cover w-72 h-72"
          />
          <img
            src="/assets/poster3.webp"
            alt="poster"
            className="shadow-2xl rounded-2xl object-cover w-72 h-72"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
