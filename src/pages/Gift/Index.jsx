import { Col, Flex, Image, Row } from "antd";
import GiftImg from "../../assets/gift-banner.webp";
import GiftImg2 from "../../assets/gift-banner-2.webp";
import Logo from "../../assets/image.svg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import DeviceProvider from "../../contexts/ResponsiveContext";
import GiftItem from "./components/GiftItem";
import { GIFTS } from "../../utils/constant";

function VideoItems() {
  return (
    <Flex gap={10} className="font-times">
      <div className="relative aspect-video mx-auto rounded-lg border-[1px] border-[var(--color-brand-primary)] overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/3MS9Cuw14Ao"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <Flex vertical className="w-[50%]" justify="space-between">
        <h2 className="sm:text-[15px] text-[12px] text-justify font-bold text-[var(--color-brand-primary)]">
          Chúc mừng khách hàng giành giải thưởng trong phiên live ngày
          17-03-2025
        </h2>
        <p className="text-[#CECFD2] sm:text-[10px] text-[8px]">
          Whether you have a team of 2 or 200, our shared team inboxes keep
          everyone on the same page
        </p>
        <button className="text-[#8E8E8E] w-fit rounded-full font-semibold border border-[#8E8E8E] sm:text-[12px] text-[10px] py-1 px-3 ">
          Xem thêm
        </button>
      </Flex>
    </Flex>
  );
}

function TestimonialItem() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <Image src={Logo} alt="logo" preview={false} loading="lazy" />
        <p className="text-base capitalize text-[var(--color-brand-primary)] font-bold">
          Đức Anh
        </p>
        <p>Tài khoản: anhduc...</p>
      </div>
      <div className="bg-[url('/src/assets/testimonial-bg.png')] bg-contain bg-center bg-no-repeat">
        <p className="text-justify text-white md:text-[15px] text-[12px] font-[510] md:w-[60%] w-[70%] mx-auto py-10">
          Wow thật không ngờ đến thế mình vừa trúng 1 iphone 16 Promax, vừa đăng
          nhập vào NEW88 đã may nắm đến vậy, cảm ơn NEW88 về món quà giá trị này
        </p>
      </div>
    </div>
  );
}

function Testimonial() {
  return (
    <div className="md:max-w-screen-2xl w-full mx-auto md:mt-32 mt-[15px]">
      <div className="flex justify-center items-center bg-[url('/src/assets/union.png')] bg-contain bg-center bg-no-repeat md:h-[58px] h-[32px] mb-14">
        <span className="uppercase text-[#171D29] md:text-2xl text-sm font-[860]">
          phản hồi của khách hàng
        </span>
      </div>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          425: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        className="md:w-auto w-screen"
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {GIFTS.map((_, index) => (
          <SwiperSlide key={index}>
            <TestimonialItem />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function GiftList() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="md:mt-[27px] mt-[15px] grid md:grid-cols-4 grid-cols-2 gap-4">
        {GIFTS.map((gift, index) => (
          <GiftItem
            key={index}
            id={index}
            label={gift.label}
            image={gift.image}
          />
        ))}
      </div>
    </div>
  );
}

function VideoSection() {
  return (
    <>
      <div
        className={`bg-[url('/src/assets/video-header-bg.png')] bg-contain bg-center bg-no-repeat 
            md:w-[708px] md:h-[95px] w-[90%] h-[50px] relative`}
      >
        <span className="md:text-[25px] text-[10px] text-white font-bold absolute md:top-[12%] top-[22%] left-[15%] w-[80%]">
          Tổng Hợp Giải Thưởng Trao Tặng Khách Hàng Qua Các Phiên Livestream
        </span>
      </div>

      <div className="md:mt-[27px] mt-[15px] ">
        <Row
          gutter={[16, 16]}
          align="stretch"
          className="justify-center items-center gap-5"
        >
          <Col xs={{ flex: "100%" }} xl={{ flex: "60%" }}>
            <div className="relative w-full mx-auto rounded-lg border-2 border-[var(--color-brand-primary)] overflow-hidden shadow-lg aspect-video">
              <iframe
                className="w-full h-full aspect-video"
                src="https://www.youtube.com/embed/3MS9Cuw14Ao"
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Col>
          <Col
            xs={{ flex: "100%" }}
            xl={{ flex: "35%" }}
            className="h-full grid grid-cols-1 gap-4"
          >
            <div className="h-full !justify-between items-center">
              <DeviceProvider.PC>
                <Flex vertical gap={20}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <VideoItems key={index} />
                  ))}
                </Flex>
              </DeviceProvider.PC>
            </div>

            <DeviceProvider.TABLET>
              <Flex vertical gap={20}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <VideoItems key={index} />
                ))}
              </Flex>
            </DeviceProvider.TABLET>

            <DeviceProvider.MOBILE>
              <Swiper
                slidesPerView={1}
                breakpoints={{
                  425: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 2 },
                }}
                className="w-full"
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                loop={true}
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <SwiperSlide key={index} className="">
                    <VideoItems key={index} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </DeviceProvider.MOBILE>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default function Gift() {
  return (
    <div className="max-w-[1920px] mx-auto bg-[#283348] overflow-hidden font-times">
      <Image src={GiftImg} alt="gift-banner" preview={false} loading="lazy" />
      <Flex justify="center" align="center" className="md:mt-16 mt-4">
        <Image
          src={GiftImg2}
          alt="gift-banner"
          preview={false}
          loading="lazy"
          className=" !w-[80%] mx-auto"
        />
      </Flex>
      <Flex
        justify="center"
        align="center"
        className="md:mt-[27px] mt-[15px] md:mb-20 mb-7"
      >
        <div
          className="flex justify-center items-center uppercase text-center text-white md:w-[250px] md:h-[45px] w-[195px] h-[35px] rounded-[35px]"
          style={{
            background: "linear-gradient(90deg, #FF9400 0%, #FF3A46 100%)",
          }}
        >
          <span className="md:text-[17px] text-[12px] font-[860] font-times">
            chi tiết sự kiện
          </span>
        </div>
      </Flex>

      <GiftList />

      <div className="md:p-0 px-4 mx-auto md:w-[80%] w-screen md:mt-[27px] mt-[15px] mb-10">
        <VideoSection />
      </div>
    </div>
  );
}
