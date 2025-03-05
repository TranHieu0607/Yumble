import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPhone, FaMapMarkerAlt, FaHistory, FaEdit, FaTimes } from 'react-icons/fa';
import { updateUserProfile, updateUserAvatar, fetchUserProfile, fetchUserPremium } from '../../store/userSlice';
import { fetchUserDietaries, updateUserDietary, deleteUserDietary, fetchDietaries } from '../../store/dietary';
import { fetchUserAllergies, updateUserAllergy, deleteUserAllergy, fetchAllergies } from '../../store/allergy';
import axios from 'axios';
import backgroundImage from '@/assets/bg2.png';
import { fetchFoodSuggestions } from '../../store/food';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);
  const dietaries = useSelector((state) => state.dietary.dietary.data) || [];
  const dietaryOptions = useSelector((state) => state.dietary.dietaryOptions) || [];
  const allergies = useSelector((state) => state.allergy.allergies) || [];
  const allergyOptions = useSelector((state) => state.allergy.allergyOptions) || [];
  const premium = useSelector((state) => state.user.premium);
  const userId = profile?.id;

  // State để quản lý chế độ chỉnh sửa và thông tin người dùng
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  // Cập nhật updatedData khi profile thay đổi
  useEffect(() => {
    if (profile) {
      setUpdatedData({
        name: profile.name || '',
        phone: profile.phone || '',
        address: profile.address || '',
      });
    }
  }, [profile]);

  // State để quản lý file hình đại diện
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [selectedDietary, setSelectedDietary] = useState('');
  const [selectedDietaries, setSelectedDietaries] = useState([]);
  const [isUpdatingDietary, setIsUpdatingDietary] = useState(false);

  const [activeTab, setActiveTab] = useState('favoriteFoods');

  const [isUpdatingAllergy, setIsUpdatingAllergy] = useState(false);
  const [selectedAllergy, setSelectedAllergy] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');

  const [isDeletingAllergies, setIsDeletingAllergies] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const [isDeletingDietary, setIsDeletingDietary] = useState(false);
  const [selectedDietaryToDelete, setSelectedDietaryToDelete] = useState(null);

  const [selectedDietaryPriority, setSelectedDietaryPriority] = useState('');

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

  // Hàm để xử lý việc bắt đầu chỉnh sửa thông tin
  const startEditing = () => {
    setUpdatedData({
      name: profile?.name || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
    });
    setIsEditing(true);
  };

  // Cập nhật handleAvatarChange để có preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cập nhật useEffect để set avatar preview khi profile thay đổi
  useEffect(() => {
    if (profile?.avatar) {
      setAvatarPreview(profile.avatar);
    }
  }, [profile]);

  const handleUploadAvatar = async () => {
    try {
      const userId = profile?.id;
      if (!userId || !avatarFile) return;

      const result = await dispatch(updateUserAvatar({ userId, avatarFile }));
      if (result.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchUserProfile(userId));
        setAvatarFile(null);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  // Hàm để xử lý việc gửi thông tin đã chỉnh sửa
  const handleEditProfile = async () => {
    try {
      const userId = profile?.id;
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const result = await dispatch(updateUserProfile({ 
        userId, 
        updatedData: {
          name: updatedData.name,
          phone: updatedData.phone,
          address: updatedData.address
        } 
      }));
      
      if (result.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchUserProfile(userId));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Hàm để xử lý việc lưu tất cả thay đổi
  const handleSaveChanges = async () => {
    try {
      await handleEditProfile();
      if (avatarFile) {
        await handleUploadAvatar();
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchUserDietaries(userId));
      dispatch(fetchUserAllergies(userId));
      dispatch(fetchUserPremium(userId));
      dispatch(fetchAllergies());
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        await dispatch(fetchDietaries());
      } catch (error) {
        console.error('Error fetching dietary options:', error);
      }
    };
    fetchOptions();
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPremium(userId)); // Gọi thunk để lấy thông tin premium
    }
    dispatch(fetchDietaries()); // Gọi thunk để lấy danh sách dietary
    dispatch(fetchAllergies()); // Gọi thunk để lấy danh sách allergies
  }, [dispatch, userId]);

  // Console log allergies để kiểm tra
  console.log('Allergies:', allergies);

  const handleDietaryUpdate = async () => {
    try {
      const userId = profile?.id;
      if (!userId || !selectedDietary || !selectedDietaryPriority) return;

      await dispatch(updateUserDietary({ 
        userId, 
        dietaryId: selectedDietary,
        priority: selectedDietaryPriority 
      })).unwrap();
      
      // Dispatch action để cập nhật gợi ý món ăn
      dispatch(fetchFoodSuggestions(userId)); // Cập nhật gợi ý món ăn
      await dispatch(fetchUserDietaries(userId));
      setSelectedDietary('');
      setSelectedDietaryPriority('');
      setIsUpdatingDietary(false);
    } catch (error) {
      console.error('Error updating dietary:', error);
    }
  };

  const handleSelectDietary = (dietaryId) => {
    setSelectedDietaries((prevSelected) => {
      if (prevSelected.includes(dietaryId)) {
        return prevSelected.filter(id => id !== dietaryId);
      } else {
        return [...prevSelected, dietaryId];
      }
    });
  };

  const handleDeleteSelectedDietaries = () => {
    const userId = profile?.id;
    selectedDietaries.forEach(dietaryId => {
      dispatch(deleteUserDietary({ userId, dietaryId }))
        .then(() => {
          dispatch(fetchUserDietaries(userId));
        })
        .catch((error) => {
          console.error('Error deleting dietary:', error);
        });
    });
    setSelectedDietaries([]);
  };

  // Hàm để xử lý việc thêm dị ứng
  const handleAllergyAdd = async () => {
    try {
      if (!selectedAllergy || !selectedSeverity) return;

      const result = await dispatch(updateUserAllergy({
        userId: profile?.id,
        allergyId: selectedAllergy,
        severity: selectedSeverity
      })).unwrap();

      if (result) {
        await dispatch(fetchUserAllergies(profile?.id));
        setSelectedAllergy('');
        setSelectedSeverity('');
        setIsUpdatingAllergy(false);
      }
    } catch (error) {
      console.error('Error adding allergy:', error);
    }
  };

  const handleDeleteAllergy = (allergyId) => {
    const userId = profile?.id;
    dispatch(deleteUserAllergy({ userId, allergyId }))
      .then(() => {
        dispatch(fetchUserAllergies(userId)); // Cập nhật lại danh sách dị ứng
      })
      .catch((error) => {
        console.error('Error deleting allergy:', error);
      });
  };

  // Hàm để chọn/deselect dị ứng
  const handleSelectAllergy = (allergyId) => {
    setSelectedAllergies((prevSelected) => {
      if (prevSelected.includes(allergyId)) {
        return prevSelected.filter(id => id !== allergyId);
      } else {
        return [...prevSelected, allergyId];
      }
    });
  };

  // Hàm để xóa các dị ứng đã chọn
  const handleDeleteSelectedAllergies = () => {
    const userId = profile?.id;
    selectedAllergies.forEach(allergyId => {
      dispatch(deleteUserAllergy({ userId, allergyId }))
        .then(() => {
          dispatch(fetchUserAllergies(userId)); // Cập nhật lại danh sách dị ứng
        })
        .catch((error) => {
          console.error('Error deleting allergy:', error);
        });
    });
    setSelectedAllergies([]); // Reset lại danh sách đã chọn
    setIsDeletingAllergies(false); // Đóng modal
  };

  // Hàm để xử lý việc xóa chế độ ăn
  const handleDeleteDietary = async (dietaryId) => {
    try {
      const userId = profile?.id;
      if (!userId || !dietaryId) return;

      await dispatch(deleteUserDietary({ userId, dietaryId })).unwrap();
      await dispatch(fetchUserDietaries(userId));
    } catch (error) {
      console.error('Error deleting dietary:', error);
    }
  };

  const confirmDeleteDietary = () => {
    const userId = profile?.id;
    if (selectedDietaries.length > 0) {
      selectedDietaries.forEach(dietaryId => {
        dispatch(deleteUserDietary({ userId, dietaryId }))
          .then(() => {
            dispatch(fetchUserDietaries(userId));
          })
          .catch((error) => {
            console.error('Error deleting dietary:', error);
          });
      });
      setIsDeletingDietary(false);
      setSelectedDietaries([]);
    }
  };

  console.log('Dietaries:', dietaries);
  console.log('Token:', localStorage.getItem('token'));

  return (
    <div className="min-h-screen bg-white" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-md">
          {/* Profile Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden group shadow-lg">
                <img
                  key={avatarPreview}
                  src={avatarPreview || profile?.avatar || "/default-avatar.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <FaEdit className="text-white text-2xl" />
                </label>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile?.name}</h1>
                <p className="text-gray-600">{profile?.email}</p>
              </div>
            </div>
            {premium && (
              <div className={`${premium.premiumStatus === 'ACTIVE' ? 'bg-yellow-400' : 'bg-gray-400'} text-white px-4 py-1 rounded-full font-semibold flex items-center`}>
                <span className="mr-1">⭐</span>
                {premium.premiumStatus === 'ACTIVE' ? 'Premium Member' : 'Premium Inactive'}
              </div>
            )}
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
              {!isEditing ? (
                <button 
                  onClick={startEditing}
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <FaEdit className="mr-1" />
                  Chỉnh sửa
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleSaveChanges}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                  >
                    Lưu
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">Họ và tên</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ và tên"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-lg">{profile?.name || 'Chưa cập nhật'}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Số điện thoại</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={updatedData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-lg">{profile?.phone || 'Chưa cập nhật'}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-600 mb-2">Địa chỉ</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={updatedData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập địa chỉ"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-lg">{profile?.address || 'Chưa cập nhật'}</p>
              )}
            </div>
          </div>

          {/* Modal thêm chế độ ăn */}
          {isUpdatingDietary && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-[500px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Thêm chế độ ăn</h3>
                  <button 
                    onClick={() => setIsUpdatingDietary(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Chọn chế độ ăn</label>
                  <select
                    value={selectedDietary}
                    onChange={(e) => setSelectedDietary(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn chế độ ăn</option>
                    {dietaryOptions
                      .filter(option => !dietaries.some(d => d.dietary.id === option.id))
                      .map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Mức độ ưu tiên</label>
                  <select
                    value={selectedDietaryPriority}
                    onChange={(e) => setSelectedDietaryPriority(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn mức độ</option>
                    <option value="nhẹ">Nhẹ</option>
                    <option value="trung bình">Trung bình</option>
                    <option value="nặng">Nặng</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsUpdatingDietary(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleDietaryUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    disabled={!selectedDietary || !selectedDietaryPriority}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal thêm dị ứng */}
          {isUpdatingAllergy && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-[500px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Thêm dị ứng</h3>
                  <button 
                    onClick={() => setIsUpdatingAllergy(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Chọn dị ứng</label>
                  <select
                    value={selectedAllergy}
                    onChange={(e) => setSelectedAllergy(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn dị ứng</option>
                    {allergyOptions
                      .filter(option => !allergies.some(a => a.allergy.id === option.id))
                      .map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Mức độ dị ứng</label>
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn mức độ</option>
                    <option value="nhẹ">Nhẹ</option>
                    <option value="trung bình">Trung bình</option>
                    <option value="nặng">Nặng</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsUpdatingAllergy(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleAllergyAdd}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    disabled={!selectedAllergy || !selectedSeverity}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dietary & Allergies */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Chế độ ăn & Dị ứng</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsUpdatingDietary(true)}
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <FaEdit className="mr-1" />
                  Thêm chế độ ăn
                </button>
                <button 
                  onClick={() => setIsUpdatingAllergy(true)}
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <FaEdit className="mr-1" />
                  Thêm dị ứng
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-600 mb-2">Chế độ ăn</h3>
                <div className="">
                  {Array.isArray(dietaries) && dietaries.length > 0 ? (
                    dietaries.map((item) => (
                      <div 
                        key={`dietary-${item?.dietary?.id || Math.random()}`} 
                        className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded-lg group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item?.dietary?.name || 'Không xác định'}</span>
                          {item?.priority && (
                            <span className={`text-sm px-2 py-1 rounded ${
                              item.priority === 'nặng' 
                                ? 'bg-red-100 text-red-800'
                                : item.priority === 'trung bình'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {item.priority}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteDietary(item.dietary.id)}
                          className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">Chưa có chế độ ăn nào</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-600 mb-2">Dị ứng</h3>
                <div className="">
                  {Array.isArray(allergies) && allergies.length > 0 ? (
                    allergies.map((allergy) => (
                      <div 
                        key={`allergy-${allergy?.allergy?.id || Math.random()}`}
                        className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded-lg group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{allergy?.allergy?.name || 'Không xác định'}</span>
                          {allergy?.severity && (
                            <span className={`text-sm px-2 py-1 rounded ${
                              allergy.severity === 'nặng' 
                                ? 'bg-red-100 text-red-800'
                                : allergy.severity === 'trung bình'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {allergy.severity}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteAllergy(allergy.allergy.id)}
                          className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">Chưa có dị ứng nào</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;