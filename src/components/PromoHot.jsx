import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Flex, Image, Typography } from "antd";
import Slide1 from "../assets/slide1.webp";
import Slide2 from "../assets/slide2.webp";
import Left from "../assets/left.webp";
import Right from "../assets/right.webp";

import "swiper/css";
import "swiper/css/pagination";

export default function PromoHot() {
  const slides = [
    {
      id: 1,
      imageUrl: Slide1,
      title: "THƯỞNG 1% TIỀN NẠP KHÔNG GIỚI HẠN 04H~08H",
    },
    {
      id: 2,
      imageUrl: Slide2,
      title: "NHẬN GIFTCODE KHỦNG TỪ F8BET CHIA SẺ NGAY RINH QUÀ HAY",
    },
    {
      id: 3,
      imageUrl: Slide1,
      title: "Slide 3",
    },
  ];

  return (
    <div className="mx-auto container max-[425px]:max-w-[425px] px-4">
      <Flex
        justify="space-between"
        align="center"
        className="lg:mb-7 md:mb-5 mb-3"
      >
        <Image
          src={Left}
          alt="left"
          preview={false}
          className="lg:block hidden"
        />
        <Typography.Title
          level={3}
          className="lg:!text-4xl md:!text-2xl !font-bold font-utmBold !mb-0 uppercase"
          style={{
            background:
              "linear-gradient(180deg, #359EFF 48.35%, #1F79FF 81.94%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          khuyến mãi
        </Typography.Title>
        <Image
          src={Right}
          alt="right"
          preview={false}
          className="lg:block hidden"
        />
      </Flex>
      <div className="slider-container relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={"auto"}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 2 },
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            type: "bullets",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="rounded-xl overflow-hidden"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination flex justify-center items-center mt-[1rem]"></div>
      </div>
    </div>
  );
}
