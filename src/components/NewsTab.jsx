import { Flex, Image, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import useHomeNews from "../hooks/useHomeNews";
import Left from "../assets/left.webp";
import Right from "../assets/right.webp";
import DefaultBanner from "../assets/default-banner.webp";

function NewsTab() {
  const [activeTab, setActiveTab] = useState(null);
  const { data } = useHomeNews();
  const news = data?.data?.data;
  let i = 1;

  // const homeNews = useMemo(() => {
  //   return news
  //     ? news?.map((item) => {
  //         return {
  //           content: item.content,
  //           image: item.image,
  //           description: "",
  //           id: `tab${i++}`,
  //         };
  //       })
  //     : [];
  // }, [news, i]);

  const homeNews = useMemo(
    () => [
      {
        content: "Xem Live cùng F8BET",
        image: DefaultBanner,
        description: "",
        id: 1,
      },
    ],
    []
  );

  useEffect(() => {
    setActiveTab(homeNews[0]?.id);
  }, [homeNews]);

  return (
    <div className="mb-2">
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
          className="lg:!text-4xl md:!text-2xl !font-bold font-utmBold !mb-0"
          style={{
            background:
              "linear-gradient(180deg, #359EFF 48.35%, #1F79FF 81.94%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          TIN TỨC
        </Typography.Title>
        <Image
          src={Right}
          alt="right"
          preview={false}
          className="lg:block hidden"
        />
      </Flex>
      <div className=" lg:p-0 md:px-4 w-full">
        {homeNews.map((news, index) => {
          return (
            <>
              <Flex key={index} className="gap-5">
                <div className="w-[50%]">
                  <Image
                    src={news?.image}
                    preview={false}
                    loading="lazy"
                    className="xl:!w-[331px] xl:!h-[221px] lg:!w-[300px] lg:!h-[200px] !w-[190px] !h-[110px]  border border-[#1F79FF] rounded-2xl"
                  />
                </div>
                <div className="w-[50%]">
                  <h3
                    className={`mb-1 text-[var(--color-brand-primary)] xl:text-[24px] lg:text-[18px] text-[14px] font-semibold`}
                  >
                    {news.content}
                  </h3>
                  <p className="lg:text-sm text-[12px] text-gray-400 md:block hidden">
                    {news.description ||
                      "Lorem ipsum dolor sit amet consectetur. Orci convallis morbi mattis nunc. Hac sagittis proin elementum sed tellus eleifend orci at. Donec phasellus vitae dignissim."}
                  </p>
                </div>
              </Flex>
              <div className="h-[1px] bg-[#1F79FF] my-8"></div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default NewsTab;
