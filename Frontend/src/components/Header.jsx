import { NavLink, Link } from "react-router-dom";
import { Menu, X, ShoppingBasket, Search } from "lucide-react";
import { useState } from "react";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col sticky top-0 z-50 bg-white shadow-md">
      <div className="h-16 w-full bg-inkporaPink  flex justify-between items-center px-1">
        <button onClick={toggleMenu} className="md:hidden z-50">
          {isOpen ? (
            <X size={28} strokeWidth={1.5} />
          ) : (
            <Menu size={28} strokeWidth={1.5} />
          )}
        </button>

        <Link to={"/"} className="absolute left-1/2 transform -translate-x-1/2">
          <img src="/assets/logo.png" className="h-30 w-30 cursor-pointer " />
        </Link>

        <form action="" className="hidden md:flex px-4 py-2.5">
          <input
            type="text"
            className="h-9 bg-inkporaFrame w-full rounded-2xl p-2 border"
            placeholder="Search"
          />
        </form>
        <div className="flex gap-2">
          <Link
            to={"/login"}
            className="hidden md:flex bg-black text-white p-1 mr-2"
          >
            Login/Signup
          </Link>

          <Link to={"/cart"}>
            <ShoppingBasket size={30} strokeWidth={1.5} />
          </Link>
        </div>

        <div
          className={`fixed inset-0 z-20 bg-inkporaPink text-black transition-opacity duration-500 ease-in-out ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex justify-between items-center px-6 py-4">
            <Link
              to={"/"}
              className="absolute left-1/2 transform -translate-x-1/2 mt-8"
            >
              <img
                src="/assets/logo.png"
                className="h-30 w-30 cursor-pointer"
              />
            </Link>
          </div>

          <div className="flex flex-col items-start space-y-6 px-2 py-14 text-xl font-light">
            <Link
              to="/login"
              onClick={toggleMenu}
              className="border-b w-full border-opacity-50 py-4"
            >
              Login/Signup
            </Link>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/pens" onClick={toggleMenu}>
              Products
            </Link>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
          </div>
        </div>
      </div>
      <form action="" className="w-full flex px-4 py-2.5 md:hidden">
        <input
          type="text"
          className="h-9 bg-inkporaFrame w-full rounded-2xl p-2"
          placeholder="Search"
        />
      </form>
    </div>
  );
}

export default Header;
