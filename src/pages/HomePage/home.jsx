import React from 'react'
import backgroundImage from '../../assets/imghomepage.png'
import overlayImage from '../../assets/logoyumble.png'

const HomePage = () => {
  return (
    <div>
      <div className='relative flex flex-col h-[712px] items-center justify-center bg-cover bg-center rounded-b-[40px] overflow-hidden' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='absolute inset-0 bg-black opacity-30'>
        </div>
        <img src={overlayImage} alt="Overlay" className=' w-1/3 mb-20' />
        <div className="absolute bottom-10 left-20 z-10 text-left text-white max-w-7xl">
          <p className="text-7xl font-bold leading-tight">
            Yumble biến việc ăn uống của bạn trở nên thú vị hơn!
          </p>
        </div>

      </div>
      <div className='mt-5 ml-10'>
        <div className='max-w-4xl'>
          <p className='text-5xl font-bold mb-4'>Chúng tôi sẽ giúp bạn tìm và khám phá món ngon bạn muốn!</p>
        </div>
        <div className='flex justify-between'>
          <div className='w-1/2 pr-2 max-w-4xl'>
            <p className='text-3xl font-bold mb-4 text-gray-400'>
              Thông qua việc tìm kiếm trên yumble bạn sẽ luôn tìm được những món ăn đúng ý của mình.
            </p>
          </div>
          <div className='w-1/2 pl-2 max-w-4xl'>
            <p className='text-3xl font-bold text-gray-400'>
              Bạn có thể tìm kiếm chọn lọc những đồ ăn theo sở thích cũng như những quán ăn ngon gần với bạn nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;