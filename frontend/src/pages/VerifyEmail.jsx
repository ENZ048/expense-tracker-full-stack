import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);
        setMessage(res.data.message || "Email verified successfully!");
        setSuccess(true);
      } catch (err) {
        setMessage(err.response?.data?.message || "Verification failed.");
        setSuccess(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="max-w-md w-full p-6 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-xl text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className="text-md mb-6 text-gray-300">{message}</p>

        {success ? (
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
          >
            Go to Login
          </Link>
        ) : (
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
          >
            Go to Signup
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
