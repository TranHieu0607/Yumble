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
import blog20 from '../../assets/blog5.png';
import blog21 from '../../assets/blog5.1.png';
import blog22 from '../../assets/blog5.2.png';




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
  { id: 5, title: "15 thực phẩm giúp tăng cân nhanh hiệu quả nhất 2025", sections: [
    {
      title: "1. Sinh tố protein tự làm",
      content: (
        <>
          <p>Làm sao để tăng cân nhanh? Uống sinh tố protein tự làm có thể được xem như một cách tăng cân nhanh chóng và bổ dưỡng. Bằng cách này cũng cho phép bạn kiểm soát hoàn toàn hương vị và hàm lượng chất dinh dưỡng. Chẳng hạn, bạn có thể chuẩn bị cho mình một ly sinh tố chuối socola: 1 quả chuối, 1 muỗng whey protein socola và 15ml đậu phộng hoặc các loại hạt khác...</p>
          <p className="mt-4">Các công thức sinh tố này có thể cung cấp cho cơ thể khoảng 400–600 calo, cùng với một lượng lớn protein và các vitamin và khoáng chất quan trọng khác.</p>
        </>
      ),
    },
    {
      title: "2. Sữa",
      content: (
        <>
          <p>Sữa đã được sử dụng như một thực phẩm giúp tăng cân hoặc xây dựng cơ bắp. Sữa cung cấp sự cân bằng tốt giữa protein, carbs và chất béo và là nguồn cung cấp canxi dồi dào, cũng như các vitamin và khoáng chất khác.</p>
          <p className="mt-4">Đối với những người đang cố gắng tăng thêm cơ bắp, protein sữa sẽ cung cấp cả casein và whey protein. Hơn nữa, sữa có thể giúp bạn thêm cơ bắp khi kết hợp với cử tạ. Ngoài ra, sữa, hoặc whey và casein kết hợp, có thể dẫn đến tăng khối lượng lớn hơn các nguồn protein khác.</p>
        </>
      ),
    },
    {
      title: "3. Cơm",
      content: (
        <>
          <p>158 gam gạo trắng nấu chín cung cấp 204 calo, 44 ​​gram carbs và rất ít chất béo. Cơm cũng khá giàu calo, có nghĩa là bạn có thể dễ dàng hấp thụ một lượng lớn carbs và calo từ một khẩu phần ăn, giúp bạn ăn nhiều thức ăn hơn.</p>
          <p className="mt-4">Có nhiều cách để biến món cơm trở nên ngon miệng hơn. Cách dễ nhất tăng cường protein khi bổ sung thêm một số thành phần sau khi đã nấu chín cơm: bơ và pho mát Parmesan; bông cải xanh và pho mát; trứng; hạt mè nướng, đậu phộng hoặc hạt điều...</p>
        </>
      ),
    },
    {
      title: "4. Các loại hạt và bơ hạt",
      content: (
        <>
          <p>Các loại hạt và bơ hạt - lựa chọn hoàn hảo nếu bạn đang muốn tăng cân. 1⁄4 cốc hạnh nhân chứa 170 calo, 6 gam protein, 4 gam chất xơ và 15 gam chất béo lành mạnh. Vì các thành phần dinh dưỡng của các loại hạt rất giàu calo, chỉ cần hai nắm mỗi ngày trong bữa ăn hoặc như một bữa ăn nhẹ có thể nhanh chóng bổ sung hàng trăm calo.</p>
          <img src={blog20} alt="" className="w-full h-auto object-cover rounded-xl mt-4" />
        </>
      ),
    },
    {
      title: "5. Các loại thịt đỏ",
      content: (
        <>
          <p>Các loại thịt đỏ có lẽ được xem như một trong những thực phẩm xây dựng cơ bắp tốt nhất đồng thời cũng được xem như thực phẩm tăng cân. Chẳng hạn, 170 gram bít tết chứa khoảng 5 gram leucine. Leucine, axit amin quan trọng mà cơ thể bạn cần để kích thích tổng hợp protein cơ và thêm mô cơ mới. Ngoài ra, thịt đỏ cũng chứa 456 calo và gần 49 gam protein, thịt đỏ cung cấp creatine tự nhiên tốt nhất trong chế độ ăn, có thể bổ sung một số hợp chất giúp xây dựng cơ bắp tốt nhất.</p>
          <p className="mt-4">Cả thịt nạc và mỡ đều là nguồn cung cấp protein khá phong phú, tuy nhiên thịt mỡ cung cấp nhiều calo hơn, có thể giúp bạn tăng cân.
          </p>
        </>
      ),
    },
    {
      title: "6. Khoai tây và tinh bột",
      content: (
        <>
          <p>Khoai tây và các loại thực phẩm giàu tinh bột khác được xem như nguồn thực phẩm cung cấp calo tốt cho những người muốn tăng cân. Tuy nhiên, bạn nên lựa chọn một trong những nguồn tinh bột lành mạnh sau: quinoa; yến mạch; ngô; kiều mạch; khoai tây và khoai lang; bí đao; rau củ mùa đông; đậu và các loại đậu</p>
          <p className="mt-4">Khoai tây và các loại khoai củ khác không chỉ bổ sung carbs và calo để giúp bạn tăng cân mà còn làm tăng lượng dự trữ glycogen trong cơ bắp của bạn. Glycogen, nguồn nhiên liệu chủ yếu cho hầu hết các hoạt động và thể thao.</p>
          <p className="mt-4">Nhiều nguồn carb trong số những thực phẩm kể trên cũng cung cấp các chất dinh dưỡng và chất xơ quan trọng, cũng như tinh bột kháng, có thể giúp nuôi dưỡng vi khuẩn đường ruột của bạn.</p>
        </>
      ),
    },
    {
      title: "7. Cá hồi và cá nhiều dầu",
      content: (
        <>
          <p>Giống như thịt đỏ, cá hồi và cá có dầu cũng thuộc nguồn cung cấp protein tuyệt vời và chất béo lành mạnh quan trọng. Trong số tất cả các chất dinh dưỡng mà cá hồi và cá có dầu cung cấp, axit béo omega-3, một trong những chất quan trọng nhất và được biết đến nhiều nhất. Axit béo này mang lại nhiều lợi ích cho sức khỏe của bạn và giúp chống lại bệnh tật.</p>
          <p className="mt-4">170 gram cá hồi sockeye hoang dã đã được loại bỏ xương cung cấp khoảng 250 calo và 12 gram chất béo lành mạnh cùng với 37 gam protein chất lượng cao sẽ giúp bạn xây dựng cơ bắp hoặc tăng cân hiệu quả hơn.</p>
        </>
      ),
    },
    {
      title: "8. Thực phẩm bổ sung protein",
      content: (
        <>
          <p>Uống bổ sung protein được xem như chiến lược phổ biến giúp tăng cân cho các vận động viên và người tập thể hình muốn tăng cân. Thực phẩm bổ sung protein khá phong phú bao gồm whey, đậu nành, trứng và protein đậu.</p>
          <p className="mt-4">Một số người nghĩ whey protein không lành mạnh hoặc không tự nhiên, nhưng whey protein được làm từ sữa và đã được chứng minh là giúp cải thiện các tình trạng của sức khỏe đồng thời giảm nguy cơ bệnh tật. Nếu bạn cũng đang luyện tập thì bổ sung protein có thể còn quan trọng hơn, vì nhu cầu protein hàng ngày của bạn tăng lên.</p>
          <p className="mt-4">Whey protein chứa tất cả các axit amin cần thiết cho cơ thể và có tác dụng để kích thích sự phát triển của cơ bắp.</p>
          <img src={blog21} alt="" className="w-full h-auto object-cover rounded-xl mt-4" />

        </>
      ),
    },
    {
      title: "9. Trái cây sấy khô",
      content: (
        <>
          <p>Ăn gì tăng cân nhanh? Trái cây sấy khô có hàm lượng calo cao cũng cung cấp chất chống oxy hóa và vi chất dinh dưỡng. Bạn có thể sử dụng được nhiều loại trái cây sấy khô khác nhau, và tất cả chúng đều có hàm lượng đường tự nhiên cao, giúp tăng cân nhanh.</p>
          <p className="mt-4">Trong khi nhiều người nghĩ rằng trái cây sẽ mất hầu hết các chất dinh dưỡng khi sấy khô, nhưng thực tế trái cây sấy khô chứa nhiều chất xơ và các vitamin và khoáng chất của trái cây sấy khô vẫn còn nguyên vẹn.</p>
        </>
      ),
    },
    {
      title: "10. Bánh mì ngũ cốc nguyên hạt",
      content: "Bánh mì ngũ cốc nguyên hạt nguồn cung cấp carb tốt khác để giúp bạn tăng cân. Bạn có thể thực hiện một số bữa ăn rất đơn giản, đồng thời cung cấp nhiều calo và cân bằng bằng cách kết hợp bánh mì với các nguồn thực phẩm giàu protein như: Trứng, thịt và pho mát.",
    },
    {
      title: "11. Bơ",
      content: (
        <>
          <p>Bơ chứa nhiều chất béo lành mạnh. Hơn nữa, bơ khá giàu calo và do đó là một thực phẩm tuyệt vời để giúp bạn tăng cân.</p>
          <p className="mt-4">Một quả bơ lớn cung cấp thành phần dinh dưỡng khoảng 322 calo, 29 gam chất béo và 14 gam chất xơ. Thêm vào đó, thành phần dinh dưỡng của bơ cũng chứa nhiều vitamin, khoáng chất và các hợp chất thực vật có lợi khác nhau.</p>
        </>
      ),
    },
    {
      title: "12. Ngũ cốc tốt cho sức khỏe",
      content: "Ngũ cốc lành mạnh có thể cung cấp carbs, calo và chất dinh dưỡng tuyệt vời cho cơ thể. Trong khi bạn nên tránh ngũ cốc đã qua chế biến, nhiều đường, thì các dạng ngũ cốc lành mạnh hơn, chẳng hạn như: Bột yến mạch nấu với sữa nguyên chất, nguồn carb tuyệt vời để thêm vào chế độ ăn của bạn. Một cốc bột yến mạch nấu chín có thể cung cấp cho cơ thể khoảng 130 calo.",
    },
    {
      title: "13. Thanh ngũ cốc",
      content: (
        <>
          <p>Thanh ngũ cốc trung bình cung cấp cho cơ thể từ 150–200 calo. Thanh ngũ cốc cũng được xem như một lựa chọn tốt trước hoặc sau một buổi tập vì chúng có xu hướng chứa hỗn hợp các loại carbs tiêu hóa chậm và tiêu hóa nhanh.</p>
          <p className="mt-4">Thanh ngũ cốc được sử dụng như một bữa ăn nhẹ hoặc bữa ăn khi di chuyển, hãy thử kết hợp một thanh ngũ cốc với các nguồn protein khác, chẳng hạn như sữa chua Hy Lạp hay trứng luộc hay thịt nguội hay sữa lắc protein.</p>
        </>
      ),
    },
    {
      title: "14. Sô cô la đen",
      content: (
        <>
          <p>Sô cô la đen có chất lượng cao sẽ cung cấp rất nhiều chất chống oxy hóa cho cơ thể đồng thời mang lại nhiều lợi ích cho sức khỏe. Sôcôla đen với ít nhất 70% cacao (loại hạt làm ra sôcôla) được cho là giúp điều chỉnh hormone căng thẳng và lượng đường trong máu. Sô cô la cũng có thể giúp giảm nguy cơ mắc bệnh tim, một số bệnh ung thư, viêm nhiễm, căng thẳng và bệnh tiểu đường loại 2.</p>
        </>
      ),
    },
    {
      title: "15. Phô mai",
      content: (
        <>
          <p>Phô mai chứa nhiều calo và chất béo. 28 gam phô mai có 110 calo và 7 gram protein.</p>
          <p className="mt-4">Phô mai có nhiều loại khác nhau, có thể là ở dạng kem, mềm, hoặc cứng. Nhiều loại pho mai chứa nhiều cholesterol và chất béo bão hòa nên tốt nhất tiêu thụ những loại phô mai này ở mức vừa phải.</p>
          <img src={blog22} alt="" className="w-full h-auto object-cover rounded-xl mt-4" />
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
  <a 
    href="https://www.facebook.com/profile.php?id=61573046339972" 
    className="text-blue-800 hover:underline ml-2"
    target="_blank" 
    rel="noopener noreferrer"
  >
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
