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
              💥💥CHÀO MỪNG SINH NHẬT OK9. Bùng nổ seri khuyến mãi siêu khủng từ
              ngày 03/10 đến 17/10 nhân dịp sự kiện đặt biệt này. Nhanh tay đăng
              nhập để tham gia và nhận hàng ngàn phần thưởng cực hot nhé!🎁🎁
            </span>
          </ReactFastMarquee>
        </Flex>
      </Flex>
    </div>
  );
}
