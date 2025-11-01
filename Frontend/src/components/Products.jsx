import { useNavigate } from "react-router-dom";

function Products({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${item._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-40 lg:w-40 xl:w-50 2xl:w-60 flex flex-col items-center transition-transform hover:scale-105"
    >
      <div className="h-56 xl:h-80 w-full bg-inkporaFrame shadow-md flex justify-center items-center overflow-hidden">
        <img
          src={item.productImage}
          alt={item.title}
          className="h-full  transition-all duration-300 hover:scale-105 p-4"
        />
      </div>

      <div className="flex justify-between items-center w-full font-medium pt-3 text-sm sm:text-base">
        <h1 className="font-playfair">{item.title}</h1>
        <h1 className="font-playfair">&#8377;{item.price}</h1>
      </div>

      <p className="pt-1 text-gray-600 text-xs sm:text-sm">{item.detail}</p>
    </div>
  );
}

export default Products;
