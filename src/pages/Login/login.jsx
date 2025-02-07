import React, { useState } from 'react';
import Loginimage from '../../assets/login2.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [formType, setFormType] = useState('login'); // 'login', 'forgotPassword', 'signup'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${formType} data:`, formData);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex flex-col justify-center p-10 bg-gray-800 shadow-lg brightness-110">
        <div className="max-w-md mx-auto">
          {formType === 'login' && (
            <>
              <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Welcome Back</h1>
              <p className="text-base text-gray-300 mb-8">
                Sign in with your email address and password to continue.
              </p>
            </>
          )}
          {formType === 'forgotPassword' && (
            <>
              <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Reset Password</h1>
              <p className="text-base text-gray-300 mb-8">Enter your email to reset your password.</p>
            </>
          )}
          {formType === 'signup' && (
            <>
              <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Create Account</h1>
              <p className="text-base text-gray-300 mb-8">Sign up to get started.</p>
            </>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm bg-gray-700 text-gray-200"
                placeholder="johndoe@example.com"
              />
            </div>

            {/* Password Input (Only for Login & Signup) */}
            {(formType === 'login' || formType === 'signup') && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-2 block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm bg-gray-700 text-gray-200"
                  placeholder="Enter your password"
                />
              </div>
            )}

            {/* Remember Me (Only for Login) */}
            {formType === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-500 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <button type="button" onClick={() => setFormType('forgotPassword')} className="text-sm text-yellow-400 hover:text-yellow-300">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 shadow-md"
            >
              {formType === 'login' ? 'Sign In' : formType === 'signup' ? 'Sign Up' : 'Reset Password'}
            </button>
          </form>

          {formType === 'login' ? (
            <p className="mt-6 text-sm text-center text-gray-300">
              Don’t have an account?{' '}
              <button type="button" onClick={() => setFormType('signup')} className="font-medium text-yellow-400 hover:text-yellow-300">
                Sign Up
              </button>
            </p>
          ) : (
            <p className="mt-6 text-sm text-center text-gray-300">
              {formType === 'signup' ? 'Already have an account? ' : 'Remember your password? '}
              <button type="button" onClick={() => setFormType('login')} className="font-medium text-yellow-400 hover:text-yellow-300">
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div
        className="hidden md:block md:w-2/3 bg-cover bg-center brightness-110"
        style={{
          backgroundImage: `url(${Loginimage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;
