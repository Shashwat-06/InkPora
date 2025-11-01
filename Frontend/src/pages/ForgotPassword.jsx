// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link, Navigate } from "react-router-dom";

// function ForgotPassword() {
//   const [formData, setFormData] = useState({ email: "" });
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/auth/forgotPassword",
//         formData
//       );

//       if (res.data.success) {
//         navigate("/resetPassword");
//       }
//     } catch (err) {
//       console.log(err);
//       setErrorMsg(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-inkporabg">
//       <div className="bg-inkporaFrame shadow-lg p-8 w-full max-w-md rounded-none">
//         <h2 className="text-3xl font-dancingscript text-center mb-6 text-black">
//           Forgot Password
//         </h2>

//         {errorMsg && (
//           <p className="text-red-600 text-sm text-center mb-4">{errorMsg}</p>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-4 text-gray-700"
//         >
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-inkporaPink"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-inkporaPink py-3 text-black font-semibold hover:bg-pink-500 transition-all disabled:opacity-50"
//           >
//             {loading ? "sending reset password link..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // ✅ new state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg(""); // clear previous message

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/forgotPassword",
        formData
      );

      if (res.data.success) {
        setSuccessMsg("✅ Reset password link sent to your email!");
        setFormData({ email: "" }); // optional: clear the input
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-inkporabg">
      <div className="bg-inkporaFrame shadow-lg p-8 w-full max-w-md rounded-none">
        <h2 className="text-3xl font-dancingscript text-center mb-6 text-black">
          Forgot Password
        </h2>

        {/* ✅ success message */}
        {successMsg && (
          <p className="text-green-600 text-sm text-center mb-4">
            {successMsg}
          </p>
        )}

        {/* error message */}
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

          <button
            type="submit"
            disabled={loading}
            className="bg-inkporaPink py-3 text-black font-semibold hover:bg-pink-500 transition-all disabled:opacity-50"
          >
            {loading ? "Sending reset password link..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
