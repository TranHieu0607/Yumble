import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPhone, FaMapMarkerAlt, FaHistory, FaEdit, FaTimes } from 'react-icons/fa';
import { updateUserProfile, updateUserAvatar, fetchUserProfile, fetchUserPremium } from '../../store/userSlice';
import { fetchUserDietaries, updateUserDietary, deleteUserDietary, fetchDietaries } from '../../store/dietary';
import { fetchUserAllergies, updateUserAllergy, deleteUserAllergy, fetchAllergies } from '../../store/allergy';




const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);
  const { dietary, loading: dietaryLoading, error: dietaryError } = useSelector((state) => state.dietary);
  const { allergies = [] } = useSelector((state) => state.allergy) || {};
  const premium = useSelector((state) => state.user.premium);
  const userId = profile?.id;

  // State để quản lý chế độ chỉnh sửa và thông tin người dùng
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
  });

  // State để quản lý file hình đại diện
  const [avatarFile, setAvatarFile] = useState(null);

  const [selectedDietary, setSelectedDietary] = useState('');
  const [dietaryOptions, setDietaryOptions] = useState([]);

  const [selectedDietaries, setSelectedDietaries] = useState([]);

  const [isUpdatingDietary, setIsUpdatingDietary] = useState(false); // Trạng thái để quản lý việc hiển thị modal cập nhật chế độ ăn

  const [activeTab, setActiveTab] = useState('favoriteFoods');

  const [isUpdatingAllergy, setIsUpdatingAllergy] = useState(false); // Trạng thái để quản lý việc hiển thị modal cập nhật dị ứng
  const [selectedAllergy, setSelectedAllergy] = useState(''); // Dị ứng được chọn để thêm

  const [selectedSeverity, setSelectedSeverity] = useState(''); // Thêm state để quản lý mức độ dị ứng

  const [isDeletingAllergies, setIsDeletingAllergies] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const [isDeletingDietary, setIsDeletingDietary] = useState(false);
  const [selectedDietaryToDelete, setSelectedDietaryToDelete] = useState(null);

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
    dispatch(updateUserProfile({ userId, updatedData })) // Gọi action để cập nhật profile
        .then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(fetchUserProfile(userId)); // Gọi lại để lấy profile mới
                // Cập nhật localStorage với thông tin mới
                localStorage.setItem('userId', userId); // Nếu userId có thể thay đổi
                localStorage.setItem('profile', JSON.stringify(result.payload)); // Lưu thông tin mới
            }
        });
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

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
    if (userId) {
      dispatch(fetchUserDietaries(userId)); // Gọi thunk để lấy thông tin chế độ ăn
      dispatch(fetchUserAllergies(userId)); // Gọi API để lấy thông tin dị ứng
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await dispatch(fetchUserDietaries(profile?.id));
      setDietaryOptions(response.payload);
    };
    fetchOptions();
  }, [dispatch, profile?.id]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPremium(userId)); // Gọi thunk để lấy thông tin premium
    }
    dispatch(fetchDietaries()); // Gọi thunk để lấy danh sách dietary
    dispatch(fetchAllergies()); // Gọi thunk để lấy danh sách allergies
  }, [dispatch, userId]);

  // Console log allergies để kiểm tra
  console.log('Allergies:', allergies);

  const handleDietaryUpdate = () => {
    const userId = profile?.id;
    dispatch(updateUserDietary({ userId, dietaryId: selectedDietary }))
      .then(() => {
        // Gọi lại để lấy thông tin chế độ ăn mới
        dispatch(fetchUserDietaries(userId));
      })
      .catch((error) => {
        console.error('Error updating dietary:', error);
      });
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
  const handleAllergyAdd = () => {
    const userId = profile?.id;
    if (selectedAllergy) {
      dispatch(updateUserAllergy({ userId, allergyId: selectedAllergy, severity: selectedSeverity }))
        .then(() => {
          dispatch(fetchUserAllergies(userId)); // Cập nhật lại danh sách dị ứng
          setSelectedAllergy(''); // Reset lại giá trị đã chọn
          setIsUpdatingAllergy(false); // Đóng modal
        })
        .catch((error) => {
          console.error('Error adding allergy:', error);
        });
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
  const handleDeleteDietary = () => {
    setIsDeletingDietary(true);
  };

  const confirmDeleteDietary = () => {
    const userId = profile?.id;
    if (selectedDietaries.length > 0) {
      selectedDietaries.forEach(dietaryId => {
        dispatch(deleteUserDietary({ userId, dietaryId }))
          .then(() => {
            dispatch(fetchUserDietaries(userId)); // Cập nhật lại danh sách chế độ ăn
          })
          .catch((error) => {
            console.error('Error deleting dietary:', error);
          });
      });
      setIsDeletingDietary(false); // Đóng modal
      setSelectedDietaries([]); // Reset lại danh sách đã chọn
    }
  };

  // Kiểm tra kiểu dữ liệu của dietary
  const dietaryList = Array.isArray(dietary) ? dietary : []; // Cung cấp giá trị mặc định là mảng rỗng

  console.log('Token:', localStorage.getItem('token'));

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

              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Chế độ ăn của bạn:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {dietaryList.map((diet) => (
                    <div key={diet.dietary.id} className="bg-blue-100 rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
                      <span className="font-semibold text-lg">{diet.dietary.name}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mb-4">Dị ứng của bạn:</h2>
                {allergies.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {allergies.map((allergy) => (
                      <li key={allergy.allergy?.id} className="text-gray-700 ">
                        <strong>{allergy.allergy?.name || 'Không xác định'}</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Bạn chưa có thông tin dị ứng nào.</p>
                )}
                <div className="flex justify-between mt-4">
                <button 
                  onClick={() => setIsUpdatingAllergy(true)} 
                  className="mt-4 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                >
                  Cập nhập dị ứng
                </button>
                <button 
                  onClick={() => setIsUpdatingDietary(true)} 
                  className="mt-4 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                >
                  Cập nhập chế độ ăn
                </button>
                </div>
              </div>
          </div>
        </div>

        {isUpdatingDietary && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg p-8 shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">Cập nhật chế độ ăn</h2>
              <div>
                <h3 className="text-md font-semibold mb-2">Chọn chế độ ăn để xóa:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {dietaryList.map((diet) => (
                    <div key={diet.dietary.id} className="bg-gray-100 rounded-lg p-4 flex items-center justify-between hover:bg-gray-200 transition">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedDietaries.includes(diet.dietary.id)}
                          onChange={() => handleSelectDietary(diet.dietary.id)}
                          className="mr-2"
                        />
                        <span className="font-semibold">{diet.dietary.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold">Chọn chế độ ăn:</label>
                  <select
                    value={selectedDietary}
                    onChange={(e) => setSelectedDietary(e.target.value)}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn chế độ ăn</option>
                    {dietaryList.length > 0 ? (
                      dietaryList.map((diet) => (
                        <option key={diet.id} value={diet.id}>{diet.name}</option>
                      ))
                    ) : (
                      <option value="" disabled>Không có chế độ ăn nào.</option>
                    )}
                  </select>
                </div>
                <div className="flex justify-between">
                  <button 
                    onClick={handleDeleteSelectedDietaries} 
                    className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition w-1/2 mr-1"
                  >
                    Xóa đã chọn
                  </button>
                  <button
                    onClick={handleDietaryUpdate}
                    className="mt-4 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition w-1/2 ml-1"
                  >
                    Cập nhật chế độ ăn
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsUpdatingDietary(false)} 
                className="mt-4 bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400 transition w-full"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {isUpdatingAllergy && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg p-8 shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">Cập nhật dị ứng</h2>
              <div>
                <label className="block text-gray-700 font-semibold">Chọn dị ứng để thêm:</label>
                <select
                  value={selectedAllergy}
                  onChange={(e) => setSelectedAllergy(e.target.value)}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn dị ứng</option>
                  {Array.isArray(allergies) && allergies.length > 0 ? (
                    allergies.map((allergy) => (
                      <option key={allergy.id} value={allergy.id}>{allergy.name}</option>
                    ))
                  ) : (
                    <option value="" disabled>Không có dị ứng nào.</option>
                  )}
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={handleAllergyAdd} 
                  className="mt-4 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition w-1/2"
                >
                  Thêm dị ứng
                </button>
                <button 
                  onClick={() => setIsDeletingAllergies(true)} 
                  className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
                >
                  Xóa 
                </button>
              </div>
              <button 
                onClick={() => setIsUpdatingAllergy(false)} 
                className="mt-4 bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400 transition w-full"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {isDeletingAllergies && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg p-8 shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4 text-center text-red-600">Xóa dị ứng</h2>
              <div className="grid grid-cols-1 gap-4 mb-4">
                {allergies.map((allergy) => (
                  <div key={allergy.allergy?.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAllergies.includes(allergy.allergy?.id)}
                      onChange={() => handleSelectAllergy(allergy.allergy?.id)}
                      className="mr-2"
                    />
                    <span>{allergy.allergy?.name || 'Không xác định'}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button 
                  onClick={handleDeleteSelectedAllergies} 
                  className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition w-1/2 mr-1"
                >
                  Xóa đã chọn
                </button>
                <button
                  onClick={() => setIsDeletingAllergies(false)} 
                  className="mt-4 bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400 transition w-1/2 ml-1"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal xác nhận xóa chế độ ăn */}
        {isDeletingDietary && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg p-8 shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4 text-center text-red-600">Xóa chế độ ăn</h2>
              <div className="grid grid-cols-1 gap-4 mb-4">
                {dietaryList.map((diet) => (
                  <div key={diet.dietary.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedDietaries.includes(diet.dietary.id)}
                      onChange={() => handleSelectDietary(diet.dietary.id)}
                      className="mr-2"
                    />
                    <span>{diet.dietary.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button 
                  onClick={confirmDeleteDietary} 
                  className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition w-1/2 mr-1"
                >
                  Xóa đã chọn
                </button>
                <button 
                  onClick={() => setIsDeletingDietary(false)} 
                  className="mt-4 bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400 transition w-1/2 ml-1"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Content - Premium Info */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin Premium:</h2>
          {premium ? (
            <div>
              <p><strong>Tình trạng:</strong> {premium.premiumStatus}</p>
              <p><strong>Ngày bắt đầu:</strong> {new Date(premium.start).toLocaleDateString()}</p>
              <p><strong>Ngày kết thúc:</strong> {new Date(premium.end).toLocaleDateString()}</p>
              <p><strong>Số ngày còn lại:</strong> {premium.remaining} ngày</p>
            </div>
          ) : (
            <p className="text-gray-500">Đang tải thông tin premium...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
