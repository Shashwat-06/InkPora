import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function User() {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="text-center text-gray-500 p-10">Loading user info...</div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-600 p-10">
        You’re not logged in. Please log in to view your account.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-inkporabg flex flex-col items-center justify-center">
      <div className="bg-inkporaFrame p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-dancingscript mb-6">User Profile</h1>
        <p className="text-lg">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg">
          <strong>Verified:</strong> {user.isVerified ? "Yes" : "Not Verified"}
        </p>

        <button
          onClick={logout}
          className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default User;
