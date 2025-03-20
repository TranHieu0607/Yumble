import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import blog1 from "../../assets/blog1.png";
import blog2 from '../../assets/blog1.1.png';
import blog3 from '../../assets/blog1.2.png';
import blog4 from '../../assets/blog1.3.png';
import blog5 from '../../assets/blog2.png';
import blog6 from '../../assets/blog2.1.png';
import blog7 from '../../assets/blog2.2.png';
import blog8 from '../../assets/blog2.3.png';
import blog9 from '../../assets/blog2.4.png';
import blog10 from '../../assets/blog2.5.png';
import blog11 from '../../assets/blog2.6.png';

import { section } from "framer-motion/client";

const posts = [
  { id: 1, title: "Thực Đơn Eat Clean Giảm Cân - Món Healthy Đơn Giản với Yumble", sections: [
    {
      title: "1. Thực đơn Eat Clean là gì?",
      content:
        "Eat Clean là phương pháp ăn uống lành mạnh, ưu tiên thực phẩm nguyên chất, ít chế biến và không chứa chất phụ gia. Phương pháp này giúp duy trì vóc dáng, tăng cường sức khỏe và hỗ trợ giảm cân an toàn. Không giống như các chế độ ăn kiêng khắc nghiệt khác, Eat Clean giúp bạn có một lối sống bền vững, cung cấp đầy đủ dinh dưỡng mà vẫn kiểm soát được lượng calo nạp vào cơ thể.",
        image: blog2,
    },
    {
      title: "2. Nguyên tắc xây dựng thực đơn Eat Clean giảm cân",
      content: (
        <>
          <p>Hạn chế tinh bột xấu, ưu tiên ngũ cốc nguyên cám và thực phẩm giàu chất xơ.</p>
          <p>Tăng cường rau xanh, trái cây và protein từ thực phẩm tự nhiên như ức gà, cá hồi, đậu phụ.</p>
          <p>Hạn chế đường, muối và thực phẩm chế biến sẵn, thay vào đó sử dụng gia vị tự nhiên.</p>
          <p>Uống đủ nước mỗi ngày để thúc đẩy quá trình trao đổi chất.</p>
          <p>Kết hợp tập luyện thể dục thể thao để đạt hiệu quả giảm cân tốt nhất.</p>
        </>
      ),
    },
    {
      title: "3. Gợi ý món healthy đơn giản cho từng bữa ăn",
      content: (
        <>
          <h3 className="text-2xl font-bold mb-2">Bữa sáng – Nạp năng lượng cho một ngày mới</h3>
          <p>🥑 Bánh mì nguyên cám + bơ + trứng luộc – Cung cấp chất béo lành mạnh và protein.</p>
          <p>🥣 Yến mạch nấu sữa hạnh nhân + chuối + hạt chia – Giàu chất xơ, giúp no lâu và hạn chế cảm giác thèm ăn.</p>
          
          <h3 className="text-2xl font-bold mb-2">Bữa trưa – Duy trì năng lượng</h3>
          <p>🥗 Salad ức gà + rau củ + sốt dầu oliu – Giàu protein và vitamin giúp cơ thể khỏe mạnh.</p>
          <p>🍚 Cơm gạo lứt + cá hồi áp chảo + rau luộc – Cung cấp đủ năng lượng mà không làm tăng cân.</p>
          
          <h3 className="text-2xl font-bold mb-2">Bữa tối – Nhẹ nhàng, ít calo</h3>
          <p>🥦 Canh rau củ + đậu hũ sốt nấm – Thơm ngon, dễ tiêu hóa, phù hợp để ăn tối muộn.</p>
          <p>🍲 Soup bí đỏ + ức gà nướng – Cung cấp protein nhưng không làm nặng bụng trước khi ngủ.</p>
        </> 
      ),
      image: blog3,
    },
    {
      title: "4. Lợi ích của thực đơn Eat Clean đối với sức khỏe",
      content: (
        <>
          <p>✅ Giúp giảm cân an toàn, không gây mất sức.</p>
          <p>✅ Tăng cường trao đổi chất, cải thiện hệ tiêu hóa.</p>
          <p>✅ Hỗ trợ đẹp da, hạn chế lão hóa nhờ dinh dưỡng lành mạnh.</p>
          <p>✅ Cung cấp năng lượng bền vững, không gây cảm giác mệt mỏi như nhiều chế độ ăn kiêng khác.</p>
        </>
      ),
      image: blog4,
    },
    {
      title: "5. Ứng dụng Yumble - Trợ thủ đắc lực cho chế độ Eat Clean",
      content:
        "Bạn không biết nên ăn gì hôm nay? 🤔 Hãy để Yumble giúp bạn! Ứng dụng thông minh này sử dụng AI để cá nhân hóa thực đơn eat clean, giúp bạn dễ dàng duy trì chế độ ăn uống lành mạnh mà không cần suy nghĩ nhiều. Chỉ cần nhập khẩu vị, mục tiêu (giảm cân, tăng cơ, duy trì sức khỏe), Yumble sẽ gợi ý món ăn phù hợp cho bạn!",
    },
    {
      title: "6. Meal Kit Yumble - Giải pháp nấu ăn nhanh gọn, lành mạnh",
      content:
        "Nếu bạn không có thời gian chuẩn bị nguyên liệu nhưng vẫn muốn duy trì chế độ ăn sạch, Meal Kit Yumble chính là lựa chọn hoàn hảo! Chúng tôi cung cấp nguyên liệu tươi ngon, sơ chế sẵn, kèm theo công thức chi tiết giúp bạn chế biến món healthy chỉ trong 15 phút! Không còn lo lắng về việc lên thực đơn hay đi chợ, chỉ cần mở hộp và nấu ngay!",
        image: blog1,
    },
  ]},
  { id: 2, title: "Gợi Ý Món Ăn Hôm Nay - Hôm Nay Ăn Gì Ngon Với Yumble", sections: [
    {
      title: "1. Hôm Nay Ăn Gì? Tìm Hiểu Về Thực Đơn Lành Mạnh",
      content:
        "'Hôm nay ăn gì?' không chỉ là câu hỏi về khẩu vị mà còn là cách để bạn chăm sóc sức khỏe. Một thực đơn lành mạnh ưu tiên nguyên liệu tươi ngon, ít chế biến sẵn và giàu dinh dưỡng. Đây cũng là triết lý mà Yumble hướng tới - mang đến những bữa ăn vừa ngon vừa tốt cho cơ thể. Dù bạn muốn giảm cân, duy trì vóc dáng hay đơn giản là ăn uống khoa học hơn, những gợi ý thực đơn hôm nay từ Yumble sẽ là lựa chọn hoàn hảo.",
    },
    {
      title: "2. Nguyên Tắc Lựa Chọn Món Ăn Hôm Nay",
      content: (
        <>
          <p>Ưu tiên nguyên liệu tự nhiên: Chọn rau củ, ngũ cốc nguyên cám và protein từ thịt gà, cá hoặc đậu phụ.</p>
          <p>Hạn chế đường và đồ chế biến sẵn: Thay bằng gia vị tự nhiên như tỏi, gừng hoặc dầu ô liu.</p>
          <p>Đảm bảo cân bằng dinh dưỡng: Kết hợp chất xơ, protein và chất béo lành mạnh trong mỗi bữa.</p>
          <p>Uống đủ nước: Hỗ trợ trao đổi chất và giúp bạn cảm thấy no lâu hơn.</p>
        </>
      ),
    },
    {
      title: "3. Gợi Ý Món Ăn Hôm Nay Cho Từng Bữa",
      content: (
        <>
          <h3 className="text-2xl font-bold mb-2 mt-4">Bữa Sáng - Khởi Đầu Ngày Mới Đầy Năng Lượng</h3>
          <p>🥑 Bánh mì nguyên cám với trứng ốp la và bơ – Cung cấp protein và chất béo tốt.</p>
          <img src={blog5} alt="" className="w-full h-auto object-cover rounded-xl mb-4" />
          <p className="mt-4">🥣 Cháo yến mạch với sữa hạnh nhân và trái cây – Giàu chất xơ, dễ tiêu hóa.</p>
          <img src={blog6} alt="" className="w-full h-auto object-cover rounded-xl mb-4"/>
          
          <h3 className="text-2xl font-bold mb-2 mt-4">Bữa Trưa - Duy Trì Năng Lượng Giữa Ngày</h3>
          <p className="mt-4">🥗 Salad cá hồi nướng với rau xanh – Nhẹ nhàng, giàu omega-3 và vitamin.</p>
          <img src={blog7} alt="" className="w-full h-auto object-cover rounded-xl mb-4"/>
          <p className="mt-4">🍚 Cơm gạo lứt với gà áp chảo và bông cải luộc – Đủ chất mà không lo tăng cân.</p>
          <img src={blog8} alt="" className="w-full h-auto object-cover rounded-xl mb-4"/>
          
          <h3 className="text-2xl font-bold mb-2 mt-4">Bữa Tối - Nhẹ Nhàng, Dễ Tiêu</h3>
          <p className="mt-4">🥦 Súp bí đỏ với đậu hũ non – Thơm ngon, ít calo.</p>
          <img src={blog9} alt="" className="w-full h-auto object-cover rounded-xl mb-4"/>
          <p className="mt-4">🍲 Rau củ xào nấm với sốt tỏi – Đơn giản, thanh đạm nhưng vẫn đầy đủ dinh dưỡng.</p>
          <img src={blog10} alt="" className="w-full h-auto object-cover rounded-xl mb-4"/>
        </> 
      ),
    },
    {
      title: "4. Lợi Ích Khi Chọn Thực Đơn Hôm Nay Từ Yumble",
      content: (
        <>
          <p>✅ Duy trì vóc dáng: Giảm cân an toàn mà không cần nhịn ăn kham khổ.</p>
          <p>✅ Tăng cường sức khỏe: Cải thiện trao đổi chất và hệ tiêu hóa.</p>
          <p>✅ Tiết kiệm thời gian: Không cần suy nghĩ quá nhiều về 'hôm nay ăn gì ngon.'</p>
          <p>✅ Cảm giác thoải mái: Năng lượng bền vững, không mệt mỏi như các chế độ ăn kiêng khác.</p>
        </>
      ),
    },
    {
      title: "5. Ứng Dụng Yumble - Người Bạn Đồng Hành Cho Mọi Bữa Ăn",
      content:
        "Nếu bạn vẫn chưa biết 'hôm nay ăn gì,' hãy để Yumble giúp bạn! Ứng dụng thông minh này sử dụng AI để cá nhân hóa gợi ý món ăn hôm nay dựa trên khẩu vị và mục tiêu của bạn (giảm cân, tăng cơ, hay duy trì sức khỏe). Chỉ cần nhập thông tin, Yumble sẽ đề xuất thực đơn phù hợp trong tích tắc. TẢI APP YUMBLE NGAY để bắt đầu hành trình ăn uống lành mạnh mà không cần đau đầu suy nghĩ!",
    },
    {
      title: "6. Meal Kit Yumble - Giải Pháp Nấu Ăn Nhanh Gọn",
      content:
        "Không có thời gian chuẩn bị nguyên liệu? Meal Kit Yumble chính là cứu tinh cho câu hỏi 'hôm nay ăn gì ngon'! Chúng tôi cung cấp nguyên liệu tươi sạch, sơ chế sẵn, kèm công thức chi tiết để bạn nấu món lành mạnh chỉ trong 15 phút. Mở hộp, chế biến và thưởng thức ngay - đơn giản mà hiệu quả! ĐẶT MEAL KIT NGAY để tận hưởng bữa ăn lành mạnh mà không mất nhiều thời gian!",
    },
    {
      image: blog11,
    },
  ]}
];

const BlogDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const blog = posts.find(b => b.id === parseInt(id));

  return (
    <div className="max-w-5xl mx-auto p-6">
      {blog ? (
        <>
          <h1 className="text-5xl font-extrabold text-gray-800 text-center my-8">{blog.title}</h1>
          {blog.sections.map((section, index) => (
            <div key={index} className="mb-5 p-6 bg-white">
              {section.image && (
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-4xl font-semibold text-gray-800 mb-2">{section.title}</h2>
              <div className="text-lg leading-relaxed text-gray-700 mb-2">{section.content}</div>
            </div>
          ))}
        </>
      ) : (
        <p>Blog không tồn tại.</p>
      )}
<h2 className="text-2xl sm:text-2xl md:text-2xl font-semibold text-gray-800 mb-2">
  <strong>👉 ĐẶT MEAL KIT NGAY</strong> 
  <a href="https://www.facebook.com/profile.php?id=61573046339972" className="text-blue-800 hover:underline ml-2">
    để tận hưởng bữa ăn lành mạnh mà không mất nhiều thời gian!
  </a>
</h2>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300 transform hover:scale-105 mr-2"
        >
          ← Quay lại Blog
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
