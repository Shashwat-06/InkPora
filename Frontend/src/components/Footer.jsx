// function Footer() {
//   return (
//     <div className="mt-30 h-50 bg-inkporaFooter flex justify-center text-white">
//       <h1>made by shashwat</h1>
//     </div>
//   );
// }

// export default Footer;
import { Link } from "react-router-dom";
import { Instagram, Twitter, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-inkporaFooter text-white py-10 px-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        <div>
          <h2 className="text-2xl font-dancingscript mb-2">inkPora</h2>
          <p className="text-sm text-gray-300">
            Express your thoughts, sketch your dreams, and write your story with
            inkPora — crafted stationery that inspires creativity.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link to="/pens" className="hover:text-white transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/Signup" className="hover:text-white transition">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/Login" className="hover:text-white transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="h-4 w-4 text-white" />
              <span>support@inkpora.shop</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Instagram className="h-4 w-4 text-white" />
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                @inkPora
              </a>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Twitter className="h-4 w-4 text-white" />
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                @inkPora
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider + Bottom Text */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} inkPora.shop — Made by Shashwat
      </div>
    </footer>
  );
}

export default Footer;
