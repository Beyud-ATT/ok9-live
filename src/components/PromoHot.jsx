import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Flex, Image, Typography } from "antd";
import Slide1 from "../assets/slide1.webp";
import Slide2 from "../assets/slide2.webp";

import "swiper/css/bundle";

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
      title: "NHẬN GIFTCODE KHỦNG TỪ OK9 CHIA SẺ NGAY RINH QUÀ HAY",
    },
    {
      id: 3,
      imageUrl: Slide1,
      title: "Slide 3",
    },
  ];

  return (
    <div className="mx-auto max-w-[calc(96vw-24px)] px-1">
      <Flex
        justify="center"
        align="center"
        className="lg:mb-7 md:mb-5 mb-3 pt-2"
      >
        <Typography.Title
          level={3}
          className="lg:!text-4xl md:!text-2xl !font-bold font-utmBold !mb-0 uppercase"
          style={{
            background:
              "linear-gradient(180deg, var(--color-brand-primary) 48.35%, var(--color-brand-primary) 81.94%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            paddingTop: "0.15em",
            lineHeight: 1.3,
          }}
        >
          khuyến mãi
        </Typography.Title>
      </Flex>
      <div className="slider-container relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
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
          className="rounded-sm md:rounded-xl overflow-hidden"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative rounded-sm md:rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-auto object-cover"
                  preview={false}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination flex justify-center items-center mt-4"></div>
      </div>
    </div>
  );
}
