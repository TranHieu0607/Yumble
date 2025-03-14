import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import blog1 from "../../assets/blog1.png";
import blog2 from '../../assets/blog1.1.png';
import blog3 from '../../assets/blog1.2.png';
import blog4 from '../../assets/blog1.3.png';
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

      <div className="text-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          ← Quay lại Blog
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
