import React from 'react';
import backgroundImage from '../../assets/search1.png'; 
import bgfoodImage from '../../assets/search2.png'; 
import foodImage from '../../assets/food.png';

const foodItems = [
    {
      id: 1,
      name: "Highlands Coffee - Trà sữa",
      address: "539 Trần Hưng Đạo, P. Lộc Vương",
      image: foodImage,
    },
    {
      id: 2,
      name: "Món ăn 2",
      address: "Địa chỉ 2",
      image: foodImage,
    },
    {
        id: 3,
        name: "Món ăn 3",
        address: "Địa chỉ 3",
        image: foodImage,
      },
      {
        id: 4,
        name: "Món ăn 3",
        address: "Địa chỉ 3",
        image: foodImage,
      },
      {
        id: 5,
        name: "Món ăn 3",
        address: "Địa chỉ 3",
        image: foodImage,
      },
      {
        id: 6,
        name: "Món ăn 3",
        address: "Địa chỉ 3",
        image: foodImage,
      },
      {
        id: 6,
        name: "Món ăn 3",
        address: "Địa chỉ 3",
        image: foodImage,
      },
      {
        id: 6,
        name: "Món ăn 3",
        address: "Địa chỉ 3",
        image: foodImage,
      },

  ];


const SearchPage = () => {
  return (
    <div>
    <div className="relative bg-cover bg-center h-full" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10 p-8 text-black ml-6">
        <h1 className="text-5xl font-bold mt-4 mb-6 " >Khám phá thêm nhiều món ngon mới lạ cùng Yumble!</h1>
        <h2 className="text-3xl font-bold mb-4">Tìm kiếm</h2>
        <div className="mb-8 flex items-center">
          <input
            type="text"
            placeholder="Tìm địa điểm, món ăn, ...."
            className="p-2 rounded-full w-96 pr-10"
            style={{maxWidth: '400px'}}
          />
        </div>
      </div>
        <div className='mb-6'>
        <div className="relative mb-6">
                <img 
                    src={bgfoodImage} 
                    alt="Food" 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg z-[-1]" 
                    style={{ filter: 'blur(2px)', zIndex: 2 }} 
                />
            <div className="relative flex justify-end items-center mr-5 z-10 ">
                <div className="bg-white bg-opacity-50 rounded-lg p-4 shadow-lg max-w-4xl w-full" style={{ marginTop: '20px' }}>
                    <h2 className="text-4xl font-bold mb-4">Đồ ăn</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {foodItems.map(item => (
                        <div key={item.id} className="relative group overflow-hidden rounded-lg shadow-md">
                            <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-[150px] object-cover transition-transform duration-300 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <h3 className="text-lg font-bold text-white">{item.name}</h3>
                            <p className="text-sm text-white">{item.address}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default SearchPage;