import ReactFastMarquee from "react-fast-marquee";
import Speaker from "../assets/speaker.webp";
import { Flex, Image } from "antd";
import { screenType, useDevice } from "../contexts/ResponsiveContext";

export default function Marquee() {
  const { deviceType } = useDevice();
  const isMobile = deviceType === screenType.MOBILE;

  return (
    <div
      className="max-w-[1200px] mx-auto"
      style={{
        borderRadius: "50px",
        border: "0.5px solid rgba(0, 18, 45, 0.06)",
        background:
          "linear-gradient(180deg, #FFF 0%, var(--color-brand-primary-lighter) 100%)",
        boxShadow:
          "0px 1px 0.1px 0px rgba(54, 166, 56, 0.25), 0px 4px 7.7px 0px rgba(54, 166, 56, 0.13), 0px -1px 5.5px 0px rgba(54, 166, 56, 0.20) inset, 0px 2px 2.7px 2px #FFF inset",
      }}
    >
      <Flex className="md:h-[62px]" justify="center" align="center">
        <Flex align="center">
          <Flex align="center" justify="center" className="px-4 gap-2">
            <Image
              src={Speaker}
              alt="speaker icon"
              loading="lazy"
              preview={false}
              width={isMobile ? 26 : 51}
              height={isMobile ? 27 : 52}
              className=""
            />
            <span className="uppercase font-sfProDisplay text-[var(--color-brand-primary)] md:block hidden lg:text-[20px] text-[12px] whitespace-nowrap">
              TIN TỨC MỚI NHẤT
            </span>
          </Flex>
          <ReactFastMarquee className="text-black overflow-hidden">
            <span className="md:text-[16px]">
              ⚽️ GIẢI TRÍ CỰC ĐỈNH - QUÀ TẶNG CỰC PHẨM CHỈ CÓ TẠI OK9! Mỗi thứ
              2 hàng tuần OK9 mang đến một buổi Livestream đỉnh cao. 🎁 ĐÓN CƠN
              MƯA HỒNG BAO VÀO CÁC NGÀY 09 - 19 - 29 MỖI THÁNG! Lì xì định kỳ
              siêu hấp dẫn. 🎁 THƯỞNG NẠP ĐẦU LÊN TỚI 18,888,000 VNĐ 🎁 BẢO HIỂM
              100% ĐƠN CƯỢC THỂ THAO ĐẦU TIÊN 🎁 ĐĂNG KÝ TÀI KHOẢN NHẬN NGAY 59K
              TRẢI NGHIỆM MIỄN PHÍ 🎁 NGOÀI RA CÒN NHIỀU KHUYẾN MÃI SIÊU HẤP DẪN
              HÃY NHANH TAY THAM GIA OK9 NGAY HÔM NAY. 💥 Link dễ nhớ:{" "}
              <a href="https://ok9aa.com">ok9aa.com</a>
            </span>
          </ReactFastMarquee>
        </Flex>
      </Flex>
    </div>
  );
}
