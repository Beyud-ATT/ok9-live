import { Flex, Image, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import useHomeNews from "../hooks/useHomeNews";
import Left from "../assets/left.webp";
import Right from "../assets/right.webp";
// import NewsImg from "../assets/news.webp";
import parse from "html-react-parser";

function NewsTab() {
  const [activeTab, setActiveTab] = useState(null);
  const { data } = useHomeNews();
  const news = data?.data?.data;
  let i = 1;

  const homeNews = useMemo(() => {
    return news
      ? news?.map((item) => {
          return {
            content: item.content,
            image: item.image,
            description: "",
            id: `tab${i++}`,
          };
        })
      : [];
  }, [news, i]);

  // const homeNews = useMemo(
  //   () => [
  //     {
  //       content: "08/03/2025 CÙNG IDOL LIZ - LIVESTREAM NHẬN THƯỞNG",
  //       image: NewsImg,
  //       description: "",
  //       id: 1,
  //     },
  //     {
  //       content: "08/03/2025 CÙNG IDOL LIZ - LIVESTREAM NHẬN THƯỞNG",
  //       image: NewsImg,
  //       description: "",
  //       id: 2,
  //     },
  //   ],
  //   []
  // );

  useEffect(() => {
    setActiveTab(homeNews[0]?.id);
  }, [homeNews]);

  return (
    <div className="mb-2">
      <Flex
        justify="space-between"
        align="center"
        className="lg:mb-7 md:mb-5 mb-3 pt-2"
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
            paddingTop: "0.15em", // Add some padding at the top
            lineHeight: 1.3, // Increase line height
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
      <div
        className="flex md:flex-row flex-col gap-8 w-full p-6"
        style={{
          borderRadius: 20,
          border: "0.517px solid #9AC6FF",
          background: "linear-gradient(180deg, #EBF5FF 0%, #C2E2FF 100%)",
          boxShadow:
            "1.034px 1.034px 2.069px 0px rgba(0, 0, 0, 0.10) inset, 2.069px 2.069px 2.069px 0px rgba(4, 37, 156, 0.25)",
        }}
      >
        {/* Left side - Tab buttons */}
        <div className="md:w-[50%] w-full">
          {homeNews.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left md:p-4 p-2 relative`}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-200 ${
                  activeTab === tab.id
                    ? "bg-[var(--color-brand-primary)]"
                    : "bg-white"
                }`}
              />
              <h3
                className={`mb-1 font-semibold text-[var(--color-brand-primary)] xl:text-[20px] lg:text-[18px] text-[14px]`}
              >
                {parse(tab.content)}
              </h3>
              <p className="text-sm text-gray-400">{tab.description}</p>
            </button>
          ))}
        </div>

        {/* Right side - Content */}
        <div className="flex w-full justify-center items-center">
          {/* {parse(tabData.find((tab) => tab.id === activeTab)?.content)} */}
          <Image
            src={homeNews.find((tab) => tab.id === activeTab)?.image}
            preview={false}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default NewsTab;
