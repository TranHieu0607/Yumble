import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPhone, FaMapMarkerAlt, FaHistory, FaEdit, FaTimes } from 'react-icons/fa';
import { Tab } from '@headlessui/react';
import { updateUserProfile, updateUserAvatar, fetchUserProfile } from '../../store/userSlice';
import { Link } from "react-router-dom";
import { fetchUserDietaries, updateUserDietary, deleteUserDietary } from '../../store/dietary';
import { fetchUserAllergies, updateUserAllergy, deleteUserAllergy } from '../../store/allergy';

const diets = [
  { id: "06c6b116-8962-45ed-a984-3803951923ee", name: "string" },
  { id: "15ccdb6a-ec1a-4609-865a-83f037bb83b3", name: "Keto" },
  { id: "1cb575c3-eff6-4647-9dfe-c20b5b92b6ba", name: "Ít carb" },
  { id: "1cba1df6-c5d4-4127-aa97-4db721cf445a", name: "Bán chay" },
  { id: "26201f5a-7bae-47e1-bd57-9f4dd42f7146", name: "Cho người tiểu đường" },
  { id: "3d5556f5-a364-413c-a3ea-6f3e253010fc", name: "Không gluten" },
  { id: "3dc0270f-490d-4295-9d06-fd469c29925c", name: "Nhịn ăn gián đoạn" },
  { id: "4271deb3-e1d6-423b-9651-eaf77c513da1", name: "Không gây dị ứng" },
  { id: "42cf4a4d-d174-46c6-87a8-d863a4ee4808", name: "Ít tinh bột" },
  { id: "5787c39a-935f-41d2-a9d2-0f614581e713", name: "Chay" },
  { id: "64aea3fc-1a78-45aa-a87b-be0fe77a422a", name: "Thực vật" },
  { id: "79fe3560-f19d-4d60-ad58-5f6595a29d0c", name: "Kiểu Địa Trung Hải" },
  { id: "7f60d17f-20af-453f-8a35-227092336bb4", name: "Thuần chay" },
  { id: "9f3a0c10-485c-4692-989e-78f225e35f20", name: "Truyền thống Việt" },
  { id: "d52975d0-231a-4fb0-a137-8555675581b5", name: "Ít chất béo" },
];

const allergyList = [
  { id: "006434b1-6c8d-492c-8e9b-be1d3c9c07be", name: "Chất bảo quản" },
  { id: "1c57c5c3-d5b3-4125-a4a3-6f52daee0883", name: "Bắp" },
  { id: "2a61fa50-849b-4c7e-ada6-9cd783656f6e", name: "Nước mắm" },
  { id: "2a8be0b6-62c4-4c0d-a1f1-49e0d79280da", name: "Tôm" },
  { id: "4bc5a20b-817c-4e38-8ee1-da13016c541d", name: "Đậu" },
  { id: "4c9abc7f-8bfd-4a3d-b9ec-6bf4d48f4876", name: "Trứng" },
  { id: "4f7f66b5-2bd8-4bbf-b11a-ce1eebe4687b", name: "Hải sản" },
  { id: "55e9bcf8-d4df-40c8-83ad-0630c30c862a", name: "Phẩm màu thực phẩm" },
  { id: "62909764-5fa7-4085-9a1c-564b9f96329d", name: "Trái cây" },
  { id: "7361186b-0309-4c83-94a2-26b3a08edca1", name: "Mè" },
  { id: "73c24960-d84d-40d0-be9a-b555dfea0e23", name: "Sữa ong chúa" },
  { id: "756cc31f-d0bd-4bd4-9528-79ec2c518804", name: "Thảo mộc" },
  { id: "7ce8b2f1-2fe3-4d36-85e7-6d5609599df5", name: "Sữa" },
  { id: "83ae5b9e-b234-4383-aae1-3b70d03d7456", name: "Dừa" },
  { id: "877b198d-0818-48bb-9502-401002ed8478", name: "Gluten" },
  { id: "8db3b4ba-db04-465b-8943-6f8673f47305", name: "Cua" },
  { id: "8ea08baa-c896-48ce-a941-2cefa730f966", name: "Hạt cây" },
  { id: "a48bfdff-ef27-45c7-abdb-01e9b50b51d4", name: "Cá" },
  { id: "b71d9823-23e0-41a6-8d6e-7b94e7de933d", name: "Đậu phộng" },
  { id: "bfe739e8-7e2c-468a-8866-ec82c9510648", name: "Đậu nành" },
  { id: "cf128c98-5763-48bb-b8e1-e5664310076e", name: "Mắm tôm" },
  { id: "ed278179-788d-4cf2-99f2-f0b783227d3b", name: "Mắm ruốc" },
  { id: "f5f8198f-532d-4bc9-be90-e475853f5f73", name: "Mắm cá" },
  { id: "ffe46755-fb36-4f79-913b-8f1d1793d40a", name: "Thịt động vật" }
];

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);
  const { dietary, loading: dietaryLoading, error: dietaryError } = useSelector((state) => state.dietary);
  const { allergies = [] } = useSelector((state) => state.allergy) || {};

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
      avatar: profile?.avatar || '',
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
            <div className="flex space-x-1">
              <button 
                onClick={() => setActiveTab('dietaryAllergies')} 
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${activeTab === 'dietaryAllergies' ? 'bg-blue-900/20' : ''}`}
              >
                Chế độ ăn và dị ứng
              </button>
            </div>

            {activeTab === 'dietaryAllergies' && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Chế độ ăn của bạn:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {dietary.map((diet) => (
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
                        <strong>{allergy.allergy?.name || 'Không xác định'}</strong> (Mức độ: <span className="text-red-500">{allergy.severity}</span>)
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
            )}
          </div>
        </div>

        {isUpdatingDietary && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg p-8 shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">Cập nhật chế độ ăn</h2>
              <div>
                <h3 className="text-md font-semibold mb-2">Chọn chế độ ăn để xóa:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {dietary.map((diet) => (
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
                    {diets.map((diet) => (
                      <option key={diet.id} value={diet.id}>{diet.name}</option>
                    ))}
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
                  {allergyList.map((allergy) => (
                    <option key={allergy.id} value={allergy.id}>{allergy.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Chọn mức độ dị ứng:</label>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn mức độ</option>
                  <option value="Mild">Nhẹ</option>
                  <option value="Moderate">Vừa</option>
                  <option value="Severe">Nặng</option>
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
      </div>
    </div>
  );
};

export default UserProfile;
