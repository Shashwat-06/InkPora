import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      console.log("Token from URL:", token);
      console.log(
        "Sending request to:",
        `${import.meta.env.VITE_API_URL}/api/auth/resetPassword/${token}`
      );
      console.log("Form data:", formData);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resetPassword/${token}`,
        formData
      );

      if (res.data.success) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-inkporabg">
      <div className="bg-inkporaFrame shadow-lg p-8 w-full max-w-md rounded-none">
        <h2 className="text-3xl font-dancingscript text-center mb-6 text-black">
          Change your password
        </h2>

        {errorMsg && (
          <p className="text-red-600 text-sm text-center mb-4">{errorMsg}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-gray-700"
        >
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
            {loading ? "changing password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
