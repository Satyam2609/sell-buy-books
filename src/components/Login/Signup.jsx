import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image2 from "../../assets/Image1.svg"
import Eye from "../../assets/eye.png"
import Eye2 from "../../assets/eye2.png"
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await fetch('http://localhost:3002/api/auth/signup', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
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
    <div className="flex md:flex-row-reverse items-center justify-center h-screen bg-gray-100">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 hidden lg:flex flex-row-reverse">
        <img src={Image2} alt="" />
      </div>

      {/* Form Container */}
      <div className="md:w-1/2 lg:w-1/3 bg-white shadow-lg p-8 rounded-md">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div className="flex items-center space-x-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="h-20 w-20 rounded-full object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:border-indigo-500"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

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
          <div className="mb-4 relative">
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

          {/* Confirm Password Input */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded border focus:outline-none focus:border-indigo-500"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
