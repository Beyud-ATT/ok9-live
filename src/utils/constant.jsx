import PC from "../assets/pc.png";
import Samsung from "../assets/samsung.png";
import Watch from "../assets/watch.png";
import Robot from "../assets/robot.png";
import Flycam from "../assets/flycam.png";
import Gopro from "../assets/gopro.png";
import Laptop from "../assets/laptop.png";
import IpadPro from "../assets/ipad.png";
import Travel from "../assets/travel.png";
import Shoes from "../assets/shoes.png";
import Chair from "../assets/chair.png";
import Ip16 from "../assets/ip16.png";
import Bag from "../assets/bag.png";
import Bike from "../assets/bike.png";
import TV from "../assets/tv.png";
import Ref from "../assets/ref.png";
import { Flex } from "antd";
import { FaCheck } from "react-icons/fa";
// import { Feedback1, Feedback2, Feedback3, Feedback4, Feedback5 } from "./svg";

const optionLabelStyle = "text-[15px] font-semibold";

const UserType = {
  USER: "1",
  IDOL: "2",
};

const chatHeightSetting = `xl:h-[392px] lg:h-[296px] md:h-[201px]`;

const videoHeightSettingInRoom = `xl:h-[455px] lg:h-[360px] md:h-[265px] h-[230px]`;
const videoHeightSettingInHome = `xl:h-[540px] lg:h-[430px] md:h-[330px] h-[220px]`;

const GIFTS = [
  {
    label: "Bộ PC Gaming",
    title: "Bộ PC Gaming Cao Cấp",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> CPU: Intel Core i5/i7 hoặc AMD Ryzen 5/7
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> GPU: NVIDIA GTX 1660 / RTX 3060
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> RAM: 16GB
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> ổ cứng: SSD 512GB
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Chức năng: Chơi game Esports và AAA ở mức đồ họa trung
          bình - cao.
        </Flex>
      </div>
    ),
    image: PC,
  },
  {
    label: "Điện thoại",
    title: "Điện thoại Samsung",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Mẫu tiêu biểu: Galaxy S23, Galaxy A55, Z Flip4
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Màn hình: AMOLED, 6.4 - 6.8 inch, Full HD+
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Chip xử lý: Snapdragon 8 Gen 1 hoặc Exynos
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Pin: 4500-5000mAh
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Chức năng: Chụp ảnh chất lượng cao
        </Flex>
      </div>
    ),
    image: Samsung,
  },
  {
    label: "Đồng hồ",
    title: "Đồng hồ đeo tay cao cấp",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Loại: Đồng hồ thông minh hoặc cơ (Casio, Xiaomi, Amazfit)
        </Flex>
        <p className=" text-lg font-bold">Tính năng:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Đo nhịp tim, bước đi, giấc ngủ
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Hiển thị thông báo, kết nối Bluetooth
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Thời lượng pin 7 - 14 ngày
        </Flex>
      </div>
    ),
    image: Watch,
  },
  {
    label: "robot hút bụi",
    title: "Robot hút bụi",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Mẫu phổ biến: Xiaomi Mi Robot Vacuum, Ecovacs Deebot
        </Flex>
        <p className=" text-lg font-bold">Tính năng:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Tiện lợi với combo kết hợp giữa robot và máy hút bụi đa
          năng
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Làm sạch từ cạnh tới góc nhờ công nghệ TruEdge™
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Công nghệ ZeroTangle™ chống rối tóc hiệu quả
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Máy hút bụi cầm tay đa năng giúp hút sạch mọi bụi bẩn dễ
          dàng
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Trạm OMNI tự động dọn bụi kép cùng nhiều tính năng tiện
          lợi
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Lực hút cực mạnh 11.000Pa, công nghệ lau xoay OZMO Turbo
          2.0
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Tránh chướng ngại vật chính xác với công nghệ TrueDetect
          3D 3.0
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Công nghệ TrueMapping 2.0 lập bản đồ chính xác
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Điều khiển cảm ứng bằng chân, trợ lý giọng nói YIKO AI
          thông minh
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Tùy chỉnh dễ dàng với ứng dụng Ecovacs Home
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Tự quay về sạc, cảm biến tránh va chạm
        </Flex>
      </div>
    ),
    image: Robot,
  },
  {
    label: "flycam",
    title: "Flycam",
    description: (
      <div>
        <p className=" text-lg font-bold">Thông số nổi bật:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Quay video tối đa: 5.4K - độ chi tiết cực cao, phù hợp
          dựng phim, du lịch chuyên nghiệp
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Quay 4K@60fps: Cho chuyển động siêu mượt - lý tưởng khi
          quay hành động, thể thao
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Ổn định hình ảnh: Gimbal 3 trục - chống rung cực tốt khi
          bay
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Thời gian bay: Thường từ 25 - 30 phút mỗi lần sạc (tùy
          mẫu)
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Phạm vi điều khiển: Có thể lên đến 6 - 10km (với dòng DJI)
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Chế độ thông minh: Theo dõi chủ thể, bay theo lộ trình, tự
          tránh chướng ngại vật
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Trạm OMNI tự động dọn bụi kép cùng nhiều tính năng tiện
          lợi
        </Flex>
        <p className=" text-lg font-bold">Công dụng chính:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Quay video du lịch, review bất động sản, cưới hỏi, thể
          thao ngoài trời
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Ghi hình toàn cảnh từ trên cao cho vlog, phim ngắn, nội
          dung sáng tạo
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Phù hợp cho: Youtuber, team media, dân phượt, sáng tạo nội
          dung
        </Flex>
      </div>
    ),
    image: Flycam,
  },
  {
    label: "gopro",
    title: "GoPro - Camera hành động siêu nhỏ gọn",
    description: (
      <div>
        <p className=" text-lg font-bold">Thông số nổi bật:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Quay video tối đa: 5.4K - độ chi tiết cực cao, phù hợp
          dựng phim, du lịch chuyên nghiệp
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Quay 4K@60fps: Cho chuyển động siêu mượt - lý tưởng khi
          quay hành động, thể thao
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Ổn định hình ảnh: Gimbal 3 trục - chống rung cực tốt khi
          bay
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Thời gian bay: Thường từ 25 - 30 phút mỗi lần sạc (tùy
          mẫu)
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Phạm vi điều khiển: Có thể lên đến 6 - 10km (với dòng DJI)
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Chế độ thông minh: Theo dõi chủ thể, bay theo lộ trình, tự
          tránh chướng ngại vật
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Trạm OMNI tự động dọn bụi kép cùng nhiều tính năng tiện
          lợi
        </Flex>
        <p className=" text-lg font-bold">Công dụng chính:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Quay video du lịch, review bất động sản, cưới hỏi, thể
          thao ngoài trời
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Ghi hình toàn cảnh từ trên cao cho vlog, phim ngắn, nội
          dung sáng tạo
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Phù hợp cho: Youtuber, team media, dân phượt, sáng tạo nội
          dung
        </Flex>
      </div>
    ),
    image: Gopro,
  },
  {
    label: "Laptop cao cấp",
    title: "Laptop cao cấp",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Hiệu năng cao với chip Intel Core Ultra 7 – xử lý mượt mà
          các tác vụ nặng
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> RAM 32GB LPDDR5x siêu nhanh, tối ưu đa nhiệm, chạy mượt
          phần mềm đồ họa
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> SSD 1TB tốc độ cao, khởi động và lưu trữ cực nhanh – hỗ
          trợ nâng cấp
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Màn hình cảm ứng 16`&quot;` QHD+ Mini LED, tần số 90Hz, độ
          sáng 630 nits, màu sắc chuẩn 100% DCI-P3 - hiển thị sống động
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Tích hợp AI Boost (NPU) và GPU Intel Arc - hỗ trợ tốt xử
          lý hình ảnh, video, AI
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Kết nối hiện đại: Wi-Fi 7, Thunderbolt 4, USB-C 3.2, HDMI
          2.1
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Bảo mật TPM 2.0, hỗ trợ vân tay, chạy Windows 11 bản quyền
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Pin 4 cell - 64Wh, sạc nhanh Type-C 65W, thiết kế vỏ nhôm
          sang trọng
        </Flex>
      </div>
    ),
    image: Laptop,
  },
  {
    label: "ipad pro",
    title: "IPad Pro",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Hiệu suất mạnh mẽ: iPad Pro được trang bị các chip xử lý
          mạnh mẽ như M1, M2, và M4, mang lại hiệu suất cao cho các tác vụ nặng
          như chỉnh sửa video và đồ họa.
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Màn hình chất lượng cao: Các phiên bản iPad Pro mới nhất
          sử dụng màn hình OLED hoặc Liquid Retina XDR, cung cấp hình ảnh sắc
          nét và sống động.
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Tính năng đa nhiệm: iPadOS cung cấp các tính năng đa nhiệm
          như Split View và Stage Manager, giúp người dùng làm việc hiệu quả với
          nhiều ứng dụng cùng lúc.
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Thiết kế và độ bền: Thiết kế kim loại nguyên khối và độ
          bền cao giúp iPad Pro trở thành một lựa chọn đáng tin cậy cho việc sử
          dụng hàng ngày.
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Hỗ trợ Apple Pencil và Magic Keyboard: Tích hợp tốt với
          các phụ kiện như Apple Pencil và Magic Keyboard, giúp tăng cường trải
          nghiệm sáng tạo và làm việc.
        </Flex>
      </div>
    ),
    image: IpadPro,
  },
  {
    label: "Chuyến du lịch",
    title: "Chuyến du lịch",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Loại hình: Tour 3-5 ngày trong nước hoặc Đông Nam Á
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Bao gồm: Vé máy bay khứ hồi, khách sạn 3–4 sao, ăn uống +
          tour
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Điểm đến gợi ý: Đà Nẵng, Đà Lạt, Phú Quốc, Thái Lan,
          Malaysia
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Phù hợp: Nghỉ dưỡng, khám phá
        </Flex>
      </div>
    ),
    image: Travel,
  },
  {
    label: "giày thể thao",
    title: "Giày thể thao Thương hiệu: Nike, Adidas, Puma, Converse",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Tính năng: Đệm êm, thoáng khí
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck />
          Thời trang và thể thao
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Hỗ trợ vận động - đi lại nhiều
        </Flex>
      </div>
    ),
    image: Shoes,
  },
  {
    label: "Ghế Massage",
    title: "Ghế Massage CAO CẤP",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Mẫu phổ biến: Fujikashi, Elip, Ogawa bản tiêu chuẩn
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Massage toàn thân, rung - nhiệt hồng ngoại
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Có remote điều chỉnh
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Gọn gàng, dễ di chuyển trong nhà
        </Flex>
      </div>
    ),
    image: Chair,
  },
  {
    label: "iphone 16",
    title: "iPhone 16 Pro Max",
    description: (
      <div>
        <p className="text-lg font-bold">Tính năng</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Camera Pro, chip A18, màn hình 120Hz
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Face ID, quay phim 4K
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Hệ điều hành iOS tối ưu cho công việc và giải trí
        </Flex>
      </div>
    ),
    image: Ip16,
  },
  {
    label: "túi đeo",
    title: "Túi đeo Loại: Túi chéo thời trang, túi đeo chéo công nghệ",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Chất liệu: Chống nước, da PU, vải cao cấp
        </Flex>
        <p className="text-lg font-bold">Tính năng:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Chứa iPad, sạc, ví, điện thoại
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Có cổng sạc USB ngoài (một số mẫu)
        </Flex>
      </div>
    ),
    image: Bag,
  },
  {
    label: "xe máy",
    title: "Xe máy tay ga",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Mẫu phổ biến: Honda Vision, Yamaha Janus, Wave Alpha,
          VinFast Evo
        </Flex>
        <p className="text-lg font-bold">Tính năng:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Động cơ tiết kiệm xăng hoặc điện
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Vận hành êm ái, cốp rộng
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Bền bỉ, chi phí bảo trì thấp
        </Flex>
      </div>
    ),
    image: Bike,
  },
  {
    label: "màn hình TV",
    title: "SMART TIVI Cao Cấp 100 INCH",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Kích thước: 43 - 55 inch
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Độ phân giải: Full HD hoặc 4K
        </Flex>
        <p className="text-lg font-bold">Tính năng:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Smart TV có Netflix, YouTube
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Điều khiển giọng nói, cổng HDMI - USB
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Âm thanh vòm giả lập
        </Flex>
      </div>
    ),
    image: TV,
  },
  {
    label: "tủ lạnh",
    title: "Tủ lạnh 4 cánh",
    description: (
      <div>
        <Flex align="center" gap={5}>
          <FaCheck /> Tủ lạnh 4 cánh 640 lít có thiết kế với 4 cửa và bề mặt cửa
          tủ làm bằng thép không gỉ có độ bền cao
        </Flex>
        <Flex align="center" gap={5}>
          <FaCheck /> Không lưu dấu vân tay, mang đến vẻ ngoài sang trọng, hiện
          đại cho căn bếp
        </Flex>
        <p className="text-lg font-bold">Tính năng:</p>
        <Flex align="center" gap={5}>
          <FaCheck /> Đặc biệt, không gian lưu trữ bên trong rộng và các cửa tủ
          được thiết kế đóng mở độc lập, dễ dàng tìm kiếm thực phẩm yêu thích
        </Flex>
      </div>
    ),
    image: Ref,
  },
];

const FEEDBACK_TYPE = {
  IDOL: {
    value: 1,
    label: (
      <Flex align="center" gap={5}>
        {/* <Feedback1 /> */}
        <span className={optionLabelStyle}>Phản hồi về idol</span>
      </Flex>
    ),
  },
  PRESENT: {
    value: 2,
    label: (
      <Flex align="center" gap={5}>
        {/* <Feedback2 /> */}
        <span className={optionLabelStyle}>Phản hồi về sản phẩm quà tặng</span>
      </Flex>
    ),
  },
  LIVESTREAM: {
    value: 3,
    label: (
      <Flex align="center" gap={5}>
        {/* <Feedback3 /> */}
        <span className={optionLabelStyle}> Phản hồi về chất lượng live</span>
      </Flex>
    ),
  },
  TALK_WITH_OK9: {
    value: 4,
    label: (
      <Flex align="center" gap={5}>
        {/* <Feedback4 /> */}
        <span className={optionLabelStyle}>Tâm sự cùng OK9</span>
      </Flex>
    ),
  },
  PROPOSE: {
    value: 5,
    label: (
      <Flex align="center" gap={5}>
        {/* <Feedback5 /> */}
        <span className={optionLabelStyle}>Đề xuất, góp ý</span>
      </Flex>
    ),
  },
};

export {
  UserType,
  GIFTS,
  FEEDBACK_TYPE,
  chatHeightSetting,
  videoHeightSettingInRoom,
  videoHeightSettingInHome,
};
