import React, { useState, useEffect } from 'react'
import backgroundImage from '../../assets/imghomepage.png'
import overlayImage from '../../assets/logoyumble.png'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchFirstSixFoods } from '../../store/food'

const HomePage = () => {
  const dispatch = useDispatch()
  const foods = useSelector((state) => state.food.foods || [])
  

  useEffect(() => {
    dispatch(fetchFirstSixFoods())
  }, [dispatch])

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(foods.length / 3));
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(foods.length / 3)) % Math.ceil(foods.length / 3));
  };

  const startIndex = currentIndex * 3;

  return (
    <div className="relative">
      <div className='relative flex flex-col h-[512px] md:h-[712px] items-center justify-center bg-cover bg-center overflow-hidden' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='absolute inset-0 bg-black opacity-30'>
        </div>
        <img src={overlayImage} alt="Overlay" className='w-2/3 md:w-1/3 mb-10 md:mb-20' />
        <div className="absolute bottom-10 left-5 md:left-20 z-[1] text-left text-white max-w-7xl">
          <p className="text-4xl md:text-7xl font-bold leading-tight">
            Yumble biến việc ăn uống của bạn trở nên thú vị hơn!
          </p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row items-center justify-between' style={{ backgroundColor: '#FCF9F4', padding: '20px md:40px' }}>
        <div className='w-full md:w-1/2 p-5 md:p-10 mt-5 md:mt-20'>
          <h1 className='text-3xl md:text-5xl font-bold mb-4' style={{ color: '#293E31' }}>Hương Vị Từ Làng Quê</h1>
          <hr style={{ maxWidth: '650px', border: 'none', borderTop: '2px solid #293E31', margin: '20px 0' }} />
          <div style={{ maxWidth: '600px' }}>
            <p className='text-base md:text-lg mb-5 md:mb-10' style={{ color: '#293E31', lineHeight: '2' }}>
            Thưởng thức những món ăn đậm chất nông thôn, được chế biến từ nguyên liệu tươi ngon, tự nhiên. Chúng tôi mang đến những hương vị mộc mạc nhưng đầy quyến rũ, giúp bạn tận hưởng sự tinh túy của nền ẩm thực truyền thống. Hãy để Yumble đưa bạn về với những bữa cơm quê hương chân thật và ấm áp.
            </p>
          </div>
        </div>
        <div className='w-full md:w-1/2 flex justify-center'>
          <div className='w-full max-w-[300px] md:max-w-[500px]'>
            <svg preserveAspectRatio="xMidYMid meet" viewBox="9.075 50.459 179.85 112.853" height="500" width="500" xmlns="http://www.w3.org/2000/svg" data-type="color" role="img" aria-label="Farm Illustration">
              <g>
                  <path d="M188.5 126.874H9.5a.425.425 0 1 1 0-.85h179a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M66.629 134.523H24.472a.425.425 0 1 1 0-.85H66.63a.425.425 0 1 1-.001.85z" fill="#FE6340"></path>
                  <path d="M59.932 143.128a.424.424 0 0 1-.002-.85l31.446-.136h.002a.424.424 0 0 1 .002.85l-31.446.136h-.002z" fill="#FE6340"></path>
                  <path d="M168.55 132.954H90.27a.425.425 0 1 1 0-.85h78.28a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M74.426 134.585h-5.194a.425.425 0 1 1 0-.85h5.194a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M21.938 134.312h-2.46a.425.425 0 1 1 0-.85h2.46a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M58.922 151.672h-4.921a.425.425 0 1 1 0-.85h4.921a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M77.433 134.585h-.82a.425.425 0 1 1 0-.85h.82a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M177.442 132.779h-5.194a.425.425 0 1 1 0-.85h5.194a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M180.449 132.779h-.82a.425.425 0 1 1 0-.85h.82a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M17.018 134.312h-1.64a.425.425 0 1 1 0-.85h1.64a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M62.339 151.535h-1.64a.425.425 0 0 1 0-.85h1.64a.425.425 0 0 1 0 .85z" fill="#FE6340"></path>
                  <path d="M39.883 141.263c-.527 0-1.36-.12-1.9-.79-.708-.879-.634-2.371.221-4.435a.42.42 0 0 1 .534-.237c1.042.272 2.782.906 3.302 2.236.295.754.153 1.591-.423 2.484a.425.425 0 0 1-.714-.459c.419-.652.536-1.229.346-1.716-.261-.668-1.128-1.255-2.398-1.633-.74 1.936-.529 2.82-.207 3.224.503.63 1.572.454 1.582.451a.43.43 0 0 1 .492.346.423.423 0 0 1-.343.491c-.023.004-.215.038-.492.038z" fill="#FE6340"></path>
                  <path d="M44.419 141.726c-.199 0-.409-.017-.628-.048a.425.425 0 0 1 .122-.841c.774.115 1.354-.021 1.722-.399.5-.513.678-1.537.501-2.839-2.09.128-2.812.689-3.044 1.152-.356.709.235 1.598.241 1.606a.426.426 0 0 1-.699.485c-.037-.053-.888-1.307-.302-2.473.508-1.011 1.906-1.562 4.153-1.638.231.006.393.14.432.347l.006.042c.18 1.055.316 2.89-.679 3.911-.451.461-1.063.695-1.825.695z" fill="#FE6340"></path>
                  <path d="M42.02 144.108a.425.425 0 0 1-.397-.272l-1.455-3.801a.425.425 0 0 1 .794-.305l1.05 2.745c.424-.956 1.212-2.312 2.507-3.133a.426.426 0 0 1 .455.719c-1.839 1.164-2.537 3.706-2.544 3.732a.425.425 0 0 1-.389.314l-.021.001z" fill="#FE6340"></path>
                  <path d="M74.22 156.866c-.527 0-1.361-.12-1.9-.79-.708-.88-.634-2.372.221-4.436a.43.43 0 0 1 .493-.25l.042.013c1.76.462 2.917 1.253 3.301 2.238.294.754.152 1.59-.423 2.483a.425.425 0 1 1-.714-.459c.419-.652.536-1.229.346-1.715-.26-.668-1.127-1.255-2.399-1.635-.741 1.939-.528 2.824-.204 3.227.502.623 1.569.451 1.578.45a.424.424 0 0 1 .494.343.424.424 0 0 1-.343.493 2.837 2.837 0 0 1-.492.038z" fill="#FE6340"></path>
                  <path d="M78.755 157.329c-.199 0-.409-.017-.628-.048a.425.425 0 0 1 .122-.841c.774.115 1.354-.021 1.722-.399.5-.513.678-1.537.501-2.839-2.086.128-2.809.688-3.043 1.148-.362.713.234 1.603.24 1.611a.425.425 0 0 1-.7.483c-.037-.053-.888-1.307-.302-2.472.508-1.011 1.905-1.562 4.153-1.638a.414.414 0 0 1 .432.347l.006.042c.18 1.055.316 2.889-.679 3.91-.45.463-1.062.696-1.824.696z" fill="#FE6340"></path>
                  <path d="M76.271 162.995a.425.425 0 0 1-.417-.344l-1.37-7.084a.425.425 0 0 1 .337-.498.42.42 0 0 1 .498.336l.943 4.879c.439-1.923 1.256-4.49 2.593-5.338a.426.426 0 0 1 .455.719c-1.503.952-2.399 5.349-2.618 6.962a.425.425 0 0 1-.409.368h-.012z" fill="#FE6340"></path>
                  <path d="M85.698 140.365c-.199 0-.409-.017-.628-.048a.425.425 0 0 1 .122-.841c.775.115 1.354-.021 1.722-.399.499-.512.678-1.536.502-2.839-2.087.128-2.81.688-3.043 1.148-.361.713.235 1.602.241 1.611a.425.425 0 0 1-.7.483c-.037-.053-.888-1.307-.302-2.472.508-1.011 1.905-1.562 4.153-1.638.235.005.393.14.432.347l.006.044c.179 1.056.315 2.89-.679 3.91-.452.462-1.064.695-1.826.695z" fill="#FE6340"></path>
                  <path d="M83.298 142.748a.425.425 0 0 1-.41-.536c.032-.117.795-2.891 2.911-4.23a.426.426 0 0 1 .455.719c-1.832 1.16-2.538 3.707-2.545 3.732a.426.426 0 0 1-.411.315z" fill="#FE6340"></path>
                  <path d="M53.796 149.016c-.558 0-.933-.224-1.164-.437-.927-.854-.917-2.711-.746-4.117h.004a.423.423 0 0 1 .444-.44c1.445.069 2.418.513 2.895 1.317.704 1.192-.009 2.676-.04 2.738a.423.423 0 0 1-.567.194.426.426 0 0 1-.196-.568c.005-.011.542-1.14.069-1.935-.283-.476-.888-.767-1.802-.867-.14 1.493.048 2.622.515 3.053.215.198.509.257.898.178a.425.425 0 0 1 .169.832 2.325 2.325 0 0 1-.479.052z" fill="#FE6340"></path>
                  <path d="M55.492 151.399a.425.425 0 0 1-.417-.346c-.005-.025-.507-2.59-1.8-3.743a.425.425 0 0 1 .566-.635c1.508 1.348 2.046 4.103 2.068 4.22a.424.424 0 0 1-.417.504z" fill="#FE6340"></path>
                  <path d="M54.089 132.256c-.488 0-.816-.196-1.02-.384-.797-.735-.791-2.311-.646-3.503h.002a.422.422 0 0 1 .444-.428c1.233.059 2.067.44 2.478 1.136.607 1.029-.004 2.302-.031 2.355a.426.426 0 0 1-.496.221.426.426 0 0 1-.315.559c-.149.03-.288.044-.416.044zm-.858-3.433c-.1 1.178.053 2.09.415 2.425.104.095.289.215.69.131a.401.401 0 0 1 .201.007.42.42 0 0 1 .018-.327c.004-.01.437-.921.061-1.553-.219-.365-.683-.595-1.385-.683z" fill="#FE6340"></path>
                  <path d="M55.508 134.249a.425.425 0 0 1-.417-.346c-.004-.021-.42-2.143-1.483-3.091a.426.426 0 0 1 .566-.635c1.28 1.142 1.734 3.469 1.752 3.567a.424.424 0 0 1-.418.505z" fill="#FE6340"></path>
                  <path d="M109.899 126.915a.425.425 0 0 1-.425-.425v-19.924H88.648v19.924a.425.425 0 0 1-.85 0v-20.349c0-.234.19-.425.425-.425h21.676c.235 0 .425.19.425.425v20.349c0 .235-.19.425-.425.425z" fill="#FE6340"></path>
                  <path d="M88.19 126.915h-8.336a.425.425 0 0 1-.425-.425v-20.349c0-.234.19-.425.425-.425h8.336c.235 0 .425.19.425.425v20.349c0 .235-.19.425-.425.425zm-7.912-.85h7.487v-19.499h-7.487v19.499z" fill="#FE6340"></path>
                  <path d="M118.27 126.915h-8.336a.425.425 0 0 1-.425-.425v-20.349c0-.234.19-.425.425-.425h8.336c.235 0 .425.19.425.425v20.349a.426.426 0 0 1-.425.425zm-7.912-.85h7.486v-19.499h-7.486v19.499z" fill="#FE6340"></path>
                  <path d="M106.238 95.152H91.624a.425.425 0 0 1-.425-.425V82.483c0-.14.068-.271.184-.35l7.225-4.98a.42.42 0 0 1 .479-.003l7.389 4.98a.424.424 0 0 1 .188.353v12.244a.426.426 0 0 1-.426.425zm-14.189-.849h13.764V82.709l-6.961-4.691-6.803 4.689v11.596z" fill="#FE6340"></path>
                  <path d="M68.964 97.193a.425.425 0 0 1-.372-.629l10.673-19.526a.43.43 0 0 1 .13-.145l18.677-13.018a.423.423 0 0 1 .479-.005l19.478 13.018a.408.408 0 0 1 .134.146l10.94 19.526a.425.425 0 0 1-.741.416l-10.89-19.438-19.152-12.8-18.357 12.796-10.625 19.439a.426.426 0 0 1-.374.22z" fill="#FE6340"></path>
                  <path d="M125.855 126.874a.425.425 0 0 1-.425-.425V95.207a.425.425 0 0 1 .85 0v31.242c0 .235-.19.425-.425.425z" fill="#FE6340"></path>
                  <path d="M72.234 126.874a.425.425 0 0 1-.425-.425V95.207a.425.425 0 0 1 .85 0v31.242c0 .235-.19.425-.425.425z" fill="#FE6340"></path>
                  <path d="M88.224 126.915a.425.425 0 0 1-.393-.263l-8.404-20.349a.424.424 0 1 1 .785-.325l8.404 20.349a.424.424 0 0 1-.392.588z" fill="#FE6340"></path>
                  <path d="M79.854 126.915a.426.426 0 0 1-.393-.586l8.336-20.349a.426.426 0 0 1 .786.323l-8.336 20.349a.427.427 0 0 1-.393.263z" fill="#FE6340"></path>
                  <path d="M118.304 126.915a.425.425 0 0 1-.393-.263l-8.404-20.349a.424.424 0 1 1 .785-.325l8.404 20.349a.424.424 0 0 1-.392.588z" fill="#FE6340"></path>
                  <path d="M109.934 126.915a.426.426 0 0 1-.393-.586l8.336-20.349a.426.426 0 0 1 .786.323l-8.336 20.349a.427.427 0 0 1-.393.263z" fill="#FE6340"></path>
                  <path d="M86.62 95.632a.423.423 0 0 1-.425-.425v-14.84a.424.424 0 0 1 .614-.381l3.662 1.822a.426.426 0 0 1-.379.761l-3.048-1.517v13.664l3.178-.452a.425.425 0 0 1 .119.841l-3.662.521a.232.232 0 0 1-.059.006z" fill="#FE6340"></path>
                  <path d="M110.946 95.632a.403.403 0 0 1-.06-.004l-3.662-.521a.425.425 0 1 1 .12-.841l3.177.452V81.054l-3.047 1.517a.426.426 0 0 1-.379-.761l3.662-1.822a.428.428 0 0 1 .614.381v14.84c0 .123-.053.24-.146.321a.436.436 0 0 1-.279.102z" fill="#FE6340"></path>
                  <path d="M155.654 155.97H88.19a.425.425 0 1 1 0-.85h67.464a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M102.753 163.312H72.234a.425.425 0 1 1 0-.85h30.519a.425.425 0 1 1 0 .85z" fill="#FE6340"></path>
                  <path d="M108.031 140.591a.425.425 0 0 1-.425-.425c0-1.126-.922-2.043-2.055-2.043s-2.055.917-2.055 2.043a.425.425 0 0 1-.85 0c0-1.595 1.303-2.893 2.904-2.893s2.904 1.298 2.904 2.893a.422.422 0 0 1-.423.425z" fill="#FE6340"></path>
                  <path d="M113.426 145.696a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.904-2.893 2.902 2.902 0 0 1 2.905 2.893.423.423 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M123.549 145.696a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893.423.423 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M133.672 145.696a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893.423.423 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M143.796 145.696a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.904-2.893 2.902 2.902 0 0 1 2.905 2.893.423.423 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M153.919 145.696a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.904-2.893 2.902 2.902 0 0 1 2.905 2.893.423.423 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M118.27 140.591a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043a.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893c0 .234-.19.425-.424.425z" fill="#FE6340"></path>
                  <path d="M128.508 140.591a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893.424.424 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M138.747 140.591a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893.424.424 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M148.986 140.591a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893.424.424 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M159.225 140.591a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893c0 .235-.19.425-.424.425z" fill="#FE6340"></path>
                  <path d="M108.031 150.082a.425.425 0 0 1-.425-.425c0-1.126-.922-2.043-2.055-2.043s-2.055.917-2.055 2.043a.425.425 0 0 1-.85 0c0-1.595 1.303-2.893 2.904-2.893s2.904 1.298 2.904 2.893a.422.422 0 0 1-.423.425z" fill="#FE6340"></path>
                  <path d="M118.27 150.082a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043a.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893c0 .235-.19.425-.424.425z" fill="#FE6340"></path>
                  <path d="M128.508 150.082a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043a.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893.423.423 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M138.747 150.082a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043a.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893.424.424 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M148.986 150.082a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043a.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893.424.424 0 0 1-.424.425z" fill="#FE6340"></path>
                  <path d="M159.225 150.082a.425.425 0 0 1-.425-.425 2.052 2.052 0 0 0-2.055-2.043 2.052 2.052 0 0 0-2.055 2.043a.425.425 0 0 1-.85 0 2.902 2.902 0 0 1 2.905-2.893 2.901 2.901 0 0 1 2.904 2.893c0 .235-.19.425-.424.425z" fill="#FE6340"></path>
              </g>
          </svg>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center mb-5 md:mb-10' style={{ backgroundColor: '#DACEC2', padding: '40px md:80px' }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8" style={{ color: '#293E31' }}>Đồ ăn Việt Nam</h2>
        <div className='flex justify-between w-full max-w-7xl items-center px-4 md:px-0'>
          <button onClick={prevProduct} className='text-xl md:text-2xl'>❮</button>
          <div className='flex flex-col md:flex-row justify-between w-full max-w-7xl'>
            {foods.slice(startIndex, startIndex + 3).map((product) => (
              <div key={product.id} className='relative w-full md:w-1/3 text-center mx-0 md:mx-2 mb-4 md:mb-0 overflow-hidden group'>
                <Link to={`/recipe/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className='w-full h-[200px] md:h-[300px] object-cover transition-transform duration-300 transform group-hover:scale-105' 
                  />
                  <div className='absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 text-center p-2 opacity-100 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    {product.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button onClick={nextProduct} className='text-xl md:text-2xl'>❯</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;