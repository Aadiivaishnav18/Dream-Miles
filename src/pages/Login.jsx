import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      alert(`Welcome Sir 👑\nLogged in as: ${email}`);

      navigate("/home"); 
    } else {
      setError("Please enter your email and password.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      >
        <source
          src="https://www.pexels.com/download/video/11184344/"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative z-20 w-full max-w-[420px] p-8 sm:p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl mx-4">

        <Link 
          to="/" 
          className="absolute top-5 left-5 text-gray-300 hover:text-white text-sm flex items-center gap-1 transition-colors"
        >
          <span>&larr;</span> Home
        </Link>

        <h2 className="text-2xl font-bold text-white text-center mb-6 tracking-wide mt-4">
          Welcome Back!
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-100 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label className="block text-xs text-gray-300 mb-1.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs text-gray-300 mb-1.5 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="text-xs text-white">Remember Me</span>
            </label>

            <span className="text-xs text-blue-400 cursor-pointer">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition mb-6"
          >
            Sign In
          </button>

          <div className="flex items-center mb-6">
            <div className="flex-grow h-px bg-white/20"></div>
            <span className="px-4 text-xs text-gray-300">OR</span>
            <div className="flex-grow h-px bg-white/20"></div>
          </div>

          <div className="space-y-3">

            <button
              type="button"
              className="w-full py-3 bg-gray-200 text-black rounded-lg"
            >
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full py-3 bg-blue-500 text-white rounded-lg"
            >
              Continue with Facebook
            </button>

          </div>

          <div className="mt-6 text-center text-sm text-white">
            Don't have an account?{" "}
            <span className="text-blue-400 cursor-pointer hover:underline">
              Sign Up
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;