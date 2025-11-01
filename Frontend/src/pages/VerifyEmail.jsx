import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // cookies if needed

function VerifyEmail() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/verifyMail",
        { code }
      );

      if (res.data.success) {
        setMessage(res.data.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000); // redirect after 2 seconds
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="bg-inkporaFrame p-8 shadow-lg w-full max-w-md rounded-none">
        <h2 className="text-3xl font-dancingscript text-center mb-6 text-black">
          Signup successful! Check your email for verification.
        </h2>

        {message && (
          <p className="text-green-600 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-inkporaPink"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-inkporaPink py-3 text-black font-semibold hover:bg-pink-500 transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
