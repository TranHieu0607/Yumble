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
import blog12 from '../../assets/blog3.png';
import blog13 from '../../assets/blog3.1.png';
import blog14 from '../../assets/blog3.2.png';
import blog15 from '../../assets/blog3.3.png';
import blog16 from '../../assets/blog4.png';
import blog17 from '../../assets/blog4.1.png';
import blog18 from '../../assets/blog4.2.png';
import blog19 from '../../assets/blog4.3.png';


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
  ]},
  { id: 3, title: "Tổng Hợp Những Món Ngon Từ Thịt Gà Dễ Làm Tại Nhà", sections: [
    {
      title: "1. Gà Chiên Giòn – Món Gà Dễ Làm Ai Cũng Thích",
      content: (
        <>
          <p className="mb-2">Gà chiên giòn là món ăn được nhiều người yêu thích, đặc biệt là trẻ em.</p>
          <img src={blog12} alt="" className="w-full h-auto object-cover rounded-xl mb-4" />
          <p>🥢 <strong>Nguyên liệu:</strong></p>
          <ul>
            <li>500g cánh gà hoặc đùi gà</li>
            <li>200g bột chiên giòn</li>
            <li>1 quả trứng gà</li>
            <li>Gia vị: Muối, tiêu, bột tỏi</li>
          </ul>
          <p>🔥 <strong>Cách làm:</strong></p>
          <ol>
            <li>Ướp gà với muối, tiêu, bột tỏi trong 30 phút.</li>
            <li>Nhúng gà vào trứng rồi lăn qua bột chiên giòn.</li>
            <li>Chiên ngập dầu ở lửa vừa đến khi vàng giòn.</li>
          </ol>
          <p>📝 <em>Mẹo nhỏ: Để gà giòn lâu, hãy chiên hai lần: lần đầu với lửa nhỏ, lần hai với lửa lớn.</em></p>
        </>
      ),
    },
    {
      title: "2. Gà Nướng Mật Ong – Hương Vị Đậm Đà, Thơm Ngon",
      content: (
        <>
          <p className="mb-3">Món gà nướng mật ong mang đến vị ngọt nhẹ, thơm lừng và rất dễ làm.</p>
          <img src={blog13} alt="" className="w-full h-auto object-cover rounded-xl mb-4" />
          <p>🥢 <strong>Nguyên liệu:</strong></p>
          <ul>
            <li>500g cánh gà hoặc đùi gà</li>
            <li>2 thìa mật ong</li>
            <li>1 thìa nước tương</li>
            <li>Gia vị: Tỏi băm, tiêu, ớt bột</li>
          </ul>
          <p>🔥 <strong>Cách làm:</strong></p>
          <ol>
            <li>Trộn mật ong, nước tương, tỏi băm và gia vị, ướp gà ít nhất 1 tiếng.</li>
            <li>Nướng gà ở 180°C trong 25 phút.</li>
            <li>Phết thêm mật ong và nướng thêm 5 phút để gà có màu đẹp.</li>
          </ol>
          <p>🔥 <em>Tip: Dùng nồi chiên không dầu giúp gà nướng nhanh và tiết kiệm dầu mỡ.</em></p>
        </>
      ),
    },
    {
      title: "3. Cách Chế Biến Ức Gà Healthy – Đơn Giản Nhưng Ngon Miệng",
      content: (
        <>
          <h3 className="text-xl font-bold mb-3">🥗 Salad Ức Gà – Món Ăn Thanh Đạm, Bổ Dưỡng</h3>
          <img src={blog14} alt="" className="w-full h-auto object-cover rounded-xl mb-4" />
          <p>🥢 <strong>Nguyên liệu:</strong></p>
          <ul>
            <li className="mb-2">100g ức gà, 1 quả trứng</li>
            <li className="mb-2">1 bát rau xanh (xà lách, dưa leo, cà chua)</li>
            <li className="mb-2">1 thìa dầu oliu, nước cốt chanh</li>
          </ul>
          <p className="mb-2">🔥 <strong>Cách làm:</strong></p>
          <ol>
            <li className="mb-2">Luộc ức gà, để nguội rồi xé sợi.</li>
            <li className="mb-2">Trộn ức gà với rau và nước sốt.</li>
          </ol>
          <p>🥗 <em>Gợi ý: Có thể thay thế nước sốt bằng sữa chua Hy Lạp để tăng độ béo ngậy.</em></p>
          <h3 className="text-xl font-bold mb-3">Ức Gà Áp Chảo – Đơn Giản Mà Ngon</h3>
          <img src={blog15} alt="" className="w-full h-auto object-cover rounded-xl mb-4" />
          <p>🥢 <strong>Nguyên liệu:</strong></p>
          <ul>
            <li className="mb-2">150g ức gà</li>
            <li className="mb-2">1 thìa dầu oliu</li>
            <li className="mb-2">Gia vị: Muối, tiêu, tỏi băm</li>
          </ul>
          <p>🔥 <strong>Cách làm:</strong></p>
          <ol>
            <li className="mb-2">Ướp ức gà với gia vị trong 15 phút.</li>
            <li className="mb-2">Áp chảo ức gà với dầu oliu khoảng 3-4 phút mỗi mặt.</li>
          </ol>
          <p>💡<em>Mẹo: Không nên lật gà quá nhiều để giữ độ mềm và ngọt thịt.</em></p>
        </>
      ),
    },
    {
      title: "4. Lợi Ích Của Thịt Gà Đối Với Sức Khỏe",
      content: (
        <>
          <p>✅ Cung cấp nguồn protein chất lượng cao, giúp tăng cường cơ bắp.</p>
          <p>✅ Hỗ trợ giảm cân hiệu quả khi chế biến đúng cách.</p>
          <p>✅ Tốt cho tim mạch nhờ ít chất béo bão hòa hơn các loại thịt đỏ.</p>
          <p>✅ Chứa nhiều vitamin B6, giúp tăng cường trao đổi chất.</p>
        </>
      ),
    },
    {
      title: "5. Yumble – Trợ Thủ Đắc Lực Cho Những Ai Yêu Thích Món Gà",
      content: (
        <>
          <p>Bạn bận rộn nhưng vẫn muốn tự tay chuẩn bị món ngon từ thịt gà? 🤔 Hãy để Yumble giúp bạn!</p>
          <ul>
            <li>🔹 <strong>Gợi ý công thức món ăn:</strong> Chỉ cần nhập sở thích, Yumble sẽ đưa ra các công thức phù hợp nhất cho bạn!</li>
            <li>🔹 <strong>Meal Kit tiện lợi:</strong> Nhận nguyên liệu tươi sạch, sơ chế sẵn, kèm hướng dẫn nấu ăn chi tiết.</li>
            <li>🔹 <strong>Chế độ ăn uống cá nhân hóa:</strong> Bạn muốn ăn eat clean hay tăng cơ? Yumble giúp bạn lên thực đơn dễ dàng!</li>
          </ul>
        </>
      ),
    }
  ]},
  { id: 4, title: "Món Ngon Từ Cá Hồi: Những Món Ăn Độc Đáo Từ Cá Hồi Cho Bữa Ăn Ngon Miệng", sections: [
    {
      title: "1. Cá Hồi Áp Chảo: Món Ăn Đơn Giản Nhưng Ngon Tuyệt",
      content: (
        <>
          <p>Cá hồi áp chảo là một món ăn đơn giản nhưng vô cùng hấp dẫn và dễ chế biến. Lớp da cá hồi giòn tan kết hợp với thịt cá mềm mại bên trong tạo nên một sự hòa quyện hoàn hảo. Để làm món cá hồi áp chảo, bạn cần chuẩn bị một miếng cá hồi tươi ngon, một chút dầu ăn, gia vị như muối, tiêu và tỏi băm để tăng thêm hương vị. Sau khi làm nóng chảo, bạn chỉ cần áp chảo cá hồi ở nhiệt độ vừa phải đến khi lớp da cá chuyển màu vàng giòn, sau đó lật mặt còn lại để cá chín đều.</p>
          <img src={blog16} alt="" className="w-full h-auto object-cover rounded-xl mb-4" />
          <p>Món cá hồi áp chảo này có thể ăn kèm với các món rau sống hoặc cơm trắng để làm bữa ăn thêm phần hấp dẫn và bổ dưỡng.</p>
        </>
      ),
    },
    {
      title: "2. Cách Làm Sushi Cá Hồi: Tạo Ra Món Sushi Tươi Ngon",
      content: (
        <>
          <p className="mb-2">Sushi cá hồi là món ăn không thể thiếu trong thực đơn của những tín đồ yêu thích ẩm thực Nhật Bản. Để làm sushi cá hồi, bạn cần chuẩn bị các nguyên liệu như gạo sushi, lá rong biển, giấm, đường, muối và tất nhiên là cá hồi tươi ngon. Việc quan trọng nhất trong món sushi cá hồi chính là chọn cá hồi chất lượng, đảm bảo tươi ngon để đảm bảo hương vị hoàn hảo.</p>
          <img src={blog17} alt="" className="w-full h-auto object-cover rounded-xl mb-4 mt-2" />
          <h4 className="mb-2">Hướng Dẫn Cách Làm Sushi Cá Hồi</h4>
          <p className="mb-2"><strong>Nấu Gạo Sushi:</strong> Trước tiên, bạn cần vo gạo cho sạch và nấu theo tỷ lệ gạo: nước là 1:1. Sau khi gạo chín, trộn với giấm sushi (giấm, đường, muối) cho gạo có độ dẻo và hương vị đặc trưng.</p>
          <p className="mb-2"><strong>Chuẩn Bị Cá Hồi:</strong> Lọc lấy phần thịt cá hồi tươi, thái thành những lát mỏng vừa ăn. Để làm sushi cá hồi, bạn nên chọn những miếng cá hồi có màu sắc tươi tắn và không có xương.</p>
          <p className="mb-2"><strong>Cuốn Sushi:</strong> Trải lá rong biển lên mặt phẳng, sau đó cho một lớp gạo sushi lên trên, để lại một khoảng trống ở cạnh trên của lá rong biển. Đặt lát cá hồi lên gạo, rồi cuộn nhẹ tay cho đến khi miếng sushi hoàn chỉnh.</p>
          <p className="mb-2"><strong>Cắt Sushi:</strong> Dùng dao sắc, cắt miếng sushi thành từng miếng nhỏ vừa ăn.</p>
          <img src={blog18} alt="" className="w-full h-auto object-cover rounded-xl mb-4" />
          <p className="mb-2">Món sushi cá hồi này có thể dùng kèm với một ít wasabi và nước tương để tăng thêm hương vị. Sushi cá hồi là một món ăn không chỉ ngon mà còn cực kỳ giàu dinh dưỡng, rất phù hợp cho những ai yêu thích ẩm thực nhẹ nhàng nhưng đầy đủ chất.</p>
        </>
      ),
    },
    {
      title: "3. Những Món Ngon Khác Từ Cá Hồi",
      content: (
        <>
          <p>Ngoài cá hồi áp chảo và sushi cá hồi, bạn cũng có thể thử các món ngon khác từ cá hồi như:</p>
          <ul>
            <li><strong>Cá Hồi Nướng:</strong> Thịt cá hồi được nướng cùng với gia vị nhẹ nhàng như chanh, tỏi, và thảo mộc tạo nên món ăn thơm ngon và dễ chế biến.</li>
            <li><strong>Súp Cá Hồi:</strong> Một bát súp cá hồi nóng hổi với nước dùng đậm đà, kết hợp với các loại rau củ tươi ngon sẽ là lựa chọn tuyệt vời cho những ngày lạnh.</li>
            <img src={blog19} alt="" className="w-full h-auto object-cover rounded-xl mb-4" />
          </ul>
        </>
      ),
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
