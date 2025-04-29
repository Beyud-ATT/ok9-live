import { Flex } from "antd";
import { useState } from "react";
import DetailData from "./DetailData";
import RatingForm from "./RatingForm";
import RatingComment from "./RatingComment";

const tabs = [
  { label: "Chi tiết", content: <DetailData /> },
  {
    label: "Đánh giá",
    content: (
      <Flex vertical className="w-full">
        <RatingForm />
        <RatingComment />
      </Flex>
    ),
  },
];

export default function Tabs() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="max-w-[1200px]] mx-auto">
      <Flex justify="center" align="center" className="my-5">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentTab(index);
            }}
            className="uppercase text-white font-semibold w-fit px-8 py-2 font-times"
            style={{
              background: `${
                currentTab === index
                  ? "linear-gradient(90deg, #FF9400 0%, #FF3A46 100%)"
                  : "transparent"
              }`,
            }}
          >
            {tab.label}
          </button>
        ))}
      </Flex>
      <Flex className="font-times">{tabs[currentTab].content}</Flex>
    </div>
  );
}
