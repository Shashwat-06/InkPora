import { NavLink, Link } from "react-router-dom";
import { Menu, X, ShoppingBasket, User, LogOut, LogIn } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  // toggle dropdown manually for mobile tap
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  return (
    <div className="flex flex-col sticky top-0 z-50 bg-white shadow-md">
      <div className="h-16 w-full bg-inkporaPink flex justify-between items-center px-2 relative">
        {/* Hamburger */}
        <button onClick={toggleMenu} className="md:hidden z-50">
          {isOpen ? (
            <X size={28} strokeWidth={1.5} />
          ) : (
            <Menu size={28} strokeWidth={1.5} />
          )}
        </button>

        {/* Logo */}
        <Link to={"/"} className="absolute left-1/2 transform -translate-x-1/2">
          <img src="/assets/logo.png" className="h-30 w-30 cursor-pointer" />
        </Link>

        <form action="" className="hidden md:flex px-4 py-2.5">
          <input
            type="text"
            className="h-9 bg-inkporaFrame w-full rounded-2xl p-2 border"
            placeholder="Search"
          />
        </form>

        {/* Right icons */}
        <div className="flex gap-2 items-center relative">
          {user ? (
            <>
              {/* user icon dropdown */}
              <div
                className="relative"
                onMouseEnter={() =>
                  window.innerWidth >= 768 && setIsUserMenuOpen(true)
                }
                onMouseLeave={() =>
                  window.innerWidth >= 768 && setIsUserMenuOpen(false)
                }
              >
                <button
                  className="px-2"
                  onClick={() => {
                    if (window.innerWidth < 768) toggleUserMenu();
                  }}
                >
                  <User size={30} strokeWidth={1.5} />
                </button>

                {isUserMenuOpen && window.innerWidth >= 768 && (
                  <div className="absolute top-full left-0 w-full h-3 bg-transparent"></div>
                )}

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-inkpora shadow-lg border border-gray-200 rounded-lg overflow-hidden z-40">
                    <div className="px-4 py-3 text-sm border-b border-gray-200">
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>

                    {!user.isVerified && (
                      <Link
                        to="/verify"
                        className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Verify your email
                      </Link>
                    )}

                    <Link
                      to="/user"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Cart icon */}
              <Link to={"/cart"}>
                <ShoppingBasket size={30} strokeWidth={1.5} />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:flex  text-black px-3 py-1 rounded-sm mr-2"
              >
                Login/Signup
              </Link>
              <Link to={"/cart"}>
                <ShoppingBasket size={30} strokeWidth={1.5} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
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
            {user ? (
              <button
                onClick={logout}
                className="border-b w-full border-opacity-50 py-4"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="border-b w-full border-opacity-50 py-4"
              >
                Login/Signup
              </Link>
            )}
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

      {/* Mobile search */}
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
