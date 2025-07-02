import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image1 from "../../assets/Image2.svg";
import Eye from "../../assets/eye.png";
import Eye2 from "../../assets/eye2.png";
import { Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch('http://localhost:3002/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to home page
      navigate('/');
      
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row items-center justify-center h-screen bg-gray-100">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 hidden lg:flex">
        <img src={Image1} alt="" />
      </div>

      {/* Form Container */}
      <div className="md:w-1/2 lg:w-1/3 bg-white shadow-lg p-8 rounded-md">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:border-indigo-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded border focus:outline-none focus:border-indigo-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <img
              src={showPassword ? Eye2 : Eye}
              alt="toggle password visibility"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-6 h-6"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
