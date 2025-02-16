import React from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaHistory, FaEdit } from 'react-icons/fa';
import { Tab } from '@headlessui/react';

const UserProfile = () => {
  const { profile } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

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
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaUser className="w-5 h-5 mr-3" />
                  <span>{profile?.name}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="w-5 h-5 mr-3" />
                  <span>{profile?.email}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaPhone className="w-5 h-5 mr-3" />
                  <span>{profile?.phone || "Chưa cập nhật"}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="w-5 h-5 mr-3" />
                  <span>{profile?.address || "Chưa cập nhật"}</span>
                </div>
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
