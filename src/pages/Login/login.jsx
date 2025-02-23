import React, { useState } from 'react';
import Loginimage from '../../assets/login2.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: authLoading, error: authError } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    name: '',
  });
  const [formType, setFormType] = useState('login'); // 'login', 'forgotPassword', 'signup'
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === 'login') {
      try {
        const result = await dispatch(login({
          email: formData.email,
          password: formData.password,
        })).unwrap();
        
        console.log('Login successful:', result);
        
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        if (token && userId) {
          navigate('/');
        } else {
          throw new Error('Không thể lưu thông tin đăng nhập');
        }
      } catch (err) {
        console.error('Lỗi đăng nhập:', err);
        alert(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
      }
    }
  };

  const handleHomeRedirect = () => {
    navigate('/');
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
            {/* Name Input (Only for Signup) */}
            {formType === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                  Họ và tên
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm bg-gray-700 text-gray-200"
                  placeholder="Nhập họ và tên"
                />
              </div>
            )}

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

            {/* Password Input với Toggle Icon */}
            {(formType === 'login' || formType === 'signup') && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm bg-gray-700 text-gray-200 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
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
              disabled={authLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 shadow-md"
            >
              {authLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
            <hr />
            <button
              type="button"
              onClick={handleHomeRedirect}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 shadow-md"
            >
              Trở về trang chủ
            </button>
          </form>

          {formType === 'login' ? (
            <p className="mt-6 text-sm text-center text-gray-300">
              Don't have an account?{' '}
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

          {/* Display Messages */}
          {(authError) && (
            <div className="mt-4 text-red-400 text-sm text-center">
              {authError?.message || 'Đã có lỗi xảy ra'}
            </div>
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