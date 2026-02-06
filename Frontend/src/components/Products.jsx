import { useNavigate } from "react-router-dom";

function Products({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${item._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-full flex flex-col transition hover:shadow-md"
    >
      {/* RECTANGULAR IMAGE CONTAINER */}
      <div className="aspect-[4/5] bg-inkporaFrame overflow-hidden">
        <img
          src={item.productImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* TEXT */}
      <div className="pt-3 flex flex-col gap-1">
        <div className="flex justify-between items-start text-sm sm:text-base font-medium">
          <h1 className="font-playfair line-clamp-2">{item.title}</h1>
          <h1 className="font-playfair whitespace-nowrap">₹{item.price}</h1>
        </div>

        {item.detail && (
          <p className="text-gray-600 text-xs sm:text-sm line-clamp-1">
            {item.detail}
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
