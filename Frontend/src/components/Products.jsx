import { Navigate, useNavigate } from "react-router-dom";
function Products({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${item._id}`);
  };
  return (
    <div onClick={handleClick} className="w-70 m-10 flex flex-col ">
      <div className="h-70 w-70 bg-inkporaFrame flex flex-col justify-around items-center ">
        <img
          src={item.productImage}
          className="h-60 w-60 hover:h-62 hover:w-62 transition-all duration-200"
        />
      </div>
      <div className="flex justify-between font-medium pt-3 text-lg">
        <h1 className="pt-3  font-playfair">{item.title}</h1>
        <h1 className="pt-1.5  font-playfair">&#8377;{item.price}</h1>
      </div>
      <h1 className="pt-1.5 ">{item.description}</h1>
    </div>
  );
}

export default Products;
