import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      if (res.data.success) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err.response?.data?.message || "Something went wrong!");

      if (err.response?.data?.unverified) {
        const email = err.response?.data?.email;
        navigate(`/verifyEmail`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-inkporabg">
      <div className="bg-inkporaFrame shadow-lg p-8 w-full max-w-md rounded-none">
        <h2 className="text-3xl font-dancingscript text-center mb-6 text-black">
          Log in to InkPora
        </h2>

        {errorMsg && (
          <p className="text-red-600 text-sm text-center mb-4">{errorMsg}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-gray-700"
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-inkporaPink"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-inkporaPink"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-inkporaPink py-3 text-black font-semibold hover:bg-pink-500 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600 mt-4">
          Forgot Password?{" "}
          <Link to="/forgotPassword" className="text-black hover:underline">
            Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
