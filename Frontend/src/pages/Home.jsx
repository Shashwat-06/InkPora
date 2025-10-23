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
      .get(`http://localhost:8080/api/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex flex-col">
      <div className="relative w-full p-4 px-10 xl:px-40">
        <img src="/assets/smPoster1.png" className="md:hidden z-0 " />
        <img src="/assets/lgPoster.png" className=" hidden md:flex z-0 " />
        <Link
          to={"/pens"}
          className="absolute bottom-40 md:bottom-15 left-1/2 transform -translate-x-1/2 bg-inkporaFrame text-black font-light px-6 py-2 shadow-md hover:bg-inkporaFrame hover:text-gray-800 transition-all duration-300 h-10 lg:text-3xl lg:h-16"
        >
          Shop Now
        </Link>
      </div>

      {/* carrousel */}
      <div className="relative w-full mt-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.slice(0, 5).map((item) => (
              <Link
                to={`/products/${item._id}`}
                key={item._id}
                className="flex-[0_0_70%] sm:flex-[0_0_33.3%] px-2"
              >
                <div className="bg-inkporaFrame  px-1 py-10 text-center">
                  <img
                    src={item.productImage}
                    alt={item.title}
                    className="w-full h-60 sm:h-60 md:h-60 lg:h-80 xl:h-100 px-4"
                  />
                  <div className="flex flex-row justify-between w-full px-4">
                    <h3 className="mt-2 font-medium font-poppins">
                      {item.title}
                    </h3>
                    <h3 className="mt-2 font-medium font-poppins">
                      &#8377;{item.price}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollPrev}
          className="hidden  sm:flex absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md "
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollNext}
          className="hidden sm:flex absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md "
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-inkporaFrame mt-5 w-full flex flex-col items-center py-20 ">
        <h2 className="font-dancingscript text-4xl font-light mb-4 text-center">
          Follow us @inkPora
        </h2>

        <div className="flex flex-wrap justify-center gap-4 w-[90%] max-w-5xl overflow-hidden">
          <img
            src="/assets/poster1.png"
            alt="poster"
            className="shadow-2xl rounded-2xl object-cover w-72 h-72"
          />
          <img
            src="/assets/poster2.png"
            alt="poster"
            className="shadow-2xl rounded-2xl object-cover w-72 h-72"
          />
          <img
            src="/assets/poster3.png"
            alt="poster"
            className="shadow-2xl rounded-2xl object-cover w-72 h-72"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
