import React, { useState } from 'react';
import Loginimage from '../../assets/login2.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth';
import { sendForgotPasswordEmail, registerUser, sendVerificationEmail } from '../../store/register';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toast.error(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
      }
    } else if (formType === 'forgotPassword') {
      try {
        await dispatch(sendForgotPasswordEmail(formData.email)).unwrap();
        toast.success('Email xác thực đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');
        setFormType('login'); // Switch back to login after sending email
      } catch (err) {
        console.error('Lỗi gửi email quên mật khẩu:', err);
        toast.error(err.message || 'Gửi email thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } else if (formType === 'signup') {
      // Kiểm tra mật khẩu
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(formData.password)) {
        toast.error('Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ cái viết hoa, 1 chữ số và 1 ký tự đặc biệt.');
        return;
      }
      try {
        const result = await dispatch(registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })).unwrap();
        
        console.log('Registration successful:', result);
        toast.success('Đăng ký thành công!'); // Notify user of success

        // Send verification email after successful registration
        await dispatch(sendVerificationEmail(formData.email)).unwrap();
        toast.success('Email xác thực đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');

        navigate('/'); // Redirect after successful registration
      } catch (err) {
        console.error('Lỗi đăng ký:', err);
        toast.error(err.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    }
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-gray-900 text-gray-100">
        {/* Left Section */}
        <div className="w-full md:w-1/3 flex flex-col justify-center p-4 sm:p-6 md:p-10 bg-gray-800 shadow-lg brightness-110">
          <div className="w-full max-w-md mx-auto space-y-4 sm:space-y-6">
            {formType === 'login' && (
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-300 mb-2 sm:mb-4">Chào mừng trở lại</h1>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 md:mb-8">
                  Đăng nhập bằng địa chỉ email và mật khẩu của bạn để tiếp tục.
                </p>
              </>
            )}
            {formType === 'forgotPassword' && (
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-300 mb-2 sm:mb-4">Đặt lại mật khẩu</h1>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 md:mb-8">Nhập email của bạn để đặt lại mật khẩu.</p>
              </>
            )}
            {formType === 'signup' && (
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-300 mb-2 sm:mb-4">Tạo tài khoản</h1>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 md:mb-8">Đăng ký để bắt đầu.</p>
              </>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name Input (Only for Signup) */}
              {formType === 'signup' && (
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 text-xs sm:text-sm bg-gray-700 text-gray-200"
                    placeholder="Nhập họ và tên"
                  />
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                  Địa chỉ Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 text-xs sm:text-sm bg-gray-700 text-gray-200"
                  placeholder="nguyenvana@example.com"
                />
              </div>

              {/* Password Input với Toggle Icon */}
              {(formType === 'login' || formType === 'signup') && (
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                    Mật khẩu
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 text-xs sm:text-sm bg-gray-700 text-gray-200 pr-10 sm:pr-12"
                      placeholder="Nhập mật khẩu của bạn"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword ? <FaEyeSlash size={16} className="sm:w-5 sm:h-5" /> : <FaEye size={16} className="sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me (Only for Login) */}
              {formType === 'login' && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-300 focus:ring-yellow-300 border-gray-500 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-xs sm:text-sm text-gray-300">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <button type="button" onClick={() => setFormType('forgotPassword')} className="text-xs sm:text-sm text-yellow-300 hover:text-yellow-200">
                    Quên mật khẩu?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full flex justify-center py-2 sm:py-3 px-3 sm:px-4 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-gray-900 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 shadow-md mt-4 sm:mt-6"
              >
                {authLoading ? 'Đang xử lý...' : (formType === 'signup' ? 'Đăng ký' : 'Đăng nhập')}
              </button>
              <hr className="my-4 sm:my-6 border-gray-600" />
              <button
                type="button"
                onClick={handleHomeRedirect}
                className="w-full flex justify-center py-2 sm:py-3 px-3 sm:px-4 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-gray-900 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 shadow-md"
              >
                Trở về trang chủ
              </button>
            </form>

            {formType === 'login' ? (
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-center text-gray-300">
                Bạn chưa có tài khoản?{' '}
                <button type="button" onClick={() => setFormType('signup')} className="font-medium text-yellow-300 hover:text-yellow-200">
                  Đăng ký
                </button>
              </p>
            ) : (
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-center text-gray-300">
                <button type="button" onClick={() => setFormType('login')} className="font-medium text-yellow-300 hover:text-yellow-200">
                  Đăng nhập
                </button>
              </p>
            )}

            {/* Display Messages */}
            {(authError) && (
              <div className="mt-4 text-red-400 text-xs sm:text-sm text-center">
                {authError?.message || 'Đã có lỗi xảy ra'}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div
          className="hidden md:block md:w-2/3 bg-cover bg-center brightness-110 relative"
          style={{
            backgroundImage: `url(${Loginimage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      </div>
    </>
  );
};

export default Login;