import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Cart() {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getCartItems = async () => {
      try {
        if (!user) {
          navigate("/login");
        }
        if (user) {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cart/showItems`,
            {
              withCredentials: true,
            }
          );

          if (res.data.success) {
            setCartItems(res.data.cart);
          } else {
            console.error("Backend returned error:", res.data.message);
          }
        }
      } catch (err) {
        console.error(
          "Error fetching cart:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, []);
  if (loading) {
    return (
      <div className="text-gray-500 p-10 text-center">Loading cart...</div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-gray-500 p-10 text-center">Your cart is empty</div>
    );
  }

  return (
    <div className="min-h-screen bg-inkporabg px-8 py-12">
      <h1 className="text-3xl font-dancingscript mb-8 text-center">
        Your Cart
      </h1>
      <ul className="space-y-6 max-w-3xl mx-auto">
        {cartItems.map((item) => (
          <li
            key={item.product._id}
            className="flex items-center justify-between bg-inkporaFrame p-5 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.productImage}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h2 className="font-medium text-lg">{item.product.title}</h2>
                <p className="text-gray-600">₹{item.product.price}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-700">Qty: {item.quantity || 1}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
