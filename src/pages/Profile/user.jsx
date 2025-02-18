import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaHistory, FaEdit, FaUpload, FaTimes } from 'react-icons/fa';
import { Tab } from '@headlessui/react';
import { updateUserProfile, updateUserAvatar, fetchUserProfile } from '../../store/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);

  // State để quản lý chế độ chỉnh sửa và thông tin người dùng
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
  });

  // State để quản lý file hình đại diện
  const [avatarFile, setAvatarFile] = useState(null);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  // Hàm để xử lý thay đổi trong các trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm để xử lý việc gửi thông tin đã chỉnh sửa
  const handleEditProfile = () => {
    const userId = profile?.id; // Lấy userId từ profile
    dispatch(updateUserProfile({ userId, updatedData })); // Gọi action để cập nhật profile
    setIsEditing(false); // Đóng form sau khi gửi
  };

  // Hàm để xử lý việc bắt đầu chỉnh sửa thông tin
  const startEditing = () => {
    setUpdatedData({
      name: profile?.name || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
    });
    setIsEditing(true);
  };

  // Hàm để xử lý việc cập nhật hình đại diện
  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]); // Lưu file hình đại diện
  };

  const handleUploadAvatar = () => {
    const userId = profile?.id; // Lấy userId từ profile
    if (avatarFile) {
        dispatch(updateUserAvatar({ userId, avatarFile }))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    // Gọi lại để lấy profile mới
                    dispatch(fetchUserProfile(userId)); // Cập nhật lại profile
                }
            })
            .catch((error) => {
                console.error('Error uploading avatar:', error);
            });
    }
  };


  const handleSaveChanges = () => {
    handleEditProfile(); 
    handleUploadAvatar(); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="absolute -bottom-12 left-8">
              <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
                <img
                  src={profile?.avatar || "/default-avatar.jpg"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile?.name}</h1>
                <p className="text-gray-600">{profile?.email}</p>
              </div>
              <button 
                onClick={startEditing}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="mr-2" />
                Chỉnh sửa thông tin
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar - User Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin cá nhân</h2>
              {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Chỉnh sửa thông tin</h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-red-500">
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tên:</label>
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Số điện thoại:</label>
                <input
                  type="text"
                  name="phone"
                  value={updatedData.phone}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Địa chỉ:</label>
                <input
                  type="text"
                  name="address"
                  value={updatedData.address}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ảnh đại diện:</label>
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="w-full border p-2" />
              </div>
              <button
                onClick={handleSaveChanges}
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        )}
                <div>
                  <p><FaPhone className="inline mr-2 text-gray-600" />{profile?.phone}</p>
                  <p><FaMapMarkerAlt className="inline mr-2 text-gray-600" />{profile?.address}</p>
                </div>
            </div>
          </div>

          {/* Right Content - Tabs */}
          <div className="md:col-span-3">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-blue-700'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  Món ăn yêu thích
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-blue-700'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  Lịch sử xem
                </Tab>
              </Tab.List>

              <Tab.Panels className="mt-6">
                {/* Favorite Foods Panel */}
                <Tab.Panel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profile?.favoriteFoods?.map((food) => (
                      <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="relative h-48">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-full object-cover"
                          />
                          <button className="absolute top-2 right-2 text-red-500">
                            <FaHeart className="h-6 w-6" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {food.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>

                {/* View History Panel */}
                <Tab.Panel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profile?.viewHistory?.map((food) => (
                      <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="relative h-48">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <FaHistory className="h-6 w-6 text-blue-500" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Xem lần cuối: {new Date(food.lastViewed).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
