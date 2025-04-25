import { Avatar, Typography } from "antd";
import { FaShare } from "react-icons/fa";
import { useParams } from "react-router";
import ViewerCount from "./ViewerCount";
import useLiveDetail from "../../hooks/useLiveDetail";

export default function Header() {
  const { id } = useParams();
  const { data: liveData } = useLiveDetail(id);
  const liveDetailData = liveData?.data?.data;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "F8BET Live",
        text: "Hãy xem thử livestream của chúng tôi!!!",
        url: window.location.href,
      });
    }
  };

  return (
    <div
      className={`bg-[var(--color-brand-primary-lighter)] border border-[var(--color-brand-primary)] border-b-0 rounded-t-2xl w-full px-4 h-[85px] flex items-center justify-between`}
    >
      <div>
        <Typography.Title
          level={2}
          className="!text-white !font-bold xl:!text-[1.0rem] lg:!text-[.7rem] !text-[.5rem]"
        >
          {liveDetailData?.title}
        </Typography.Title>
        <div className="flex items-center">
          <div className="w-[50px]">
            <Avatar
              src={liveDetailData?.avatar}
              className="md:!w-11 md:!h-11 !w-11 !h-11"
            />
          </div>
          <div className="flex flex-col">
            <Typography.Title
              level={3}
              className="!text-white !font-bold xl:!text-[.8rem] !text-[.4rem] !m-0"
            >
              {liveDetailData?.displayName}
            </Typography.Title>

            <ViewerCount />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleShare}
        className={`text-white xl:text-base
              flex items-center space-x-2
              py-2 px-3 animate-blink`}
        style={{
          borderRadius: "4px",
          background: "#3F4F75",
          boxShadow:
            "-2.517px -3.357px 5.874px 0px rgba(255, 255, 255, 0.15) inset",
        }}
      >
        <span className="whitespace-nowrap">Chia sẻ</span>
        <FaShare />
      </button>
    </div>
  );
}
