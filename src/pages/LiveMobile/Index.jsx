import { useNavigate, useParams } from "react-router";
import useLiveDetail from "../../hooks/useLiveDetail";
import { Avatar } from "antd";
import { useSignalR } from "../../contexts/SIgnalRContext";
import { screenType, useDevice } from "../../contexts/ResponsiveContext";
import { useCallback, useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import Countdown from "../../components/CountDown";
import { FaShare } from "react-icons/fa";
// import LiveTabs from "../Live/LiveTabs";
import LivestreamPlayer from "../../components/VideoPlayer";
import AdaptiveChatBar from "./AdaptiveChatBar";

const ViewerCount = ({ liveDetailData }) => {
  const { viewer } = useSignalR();
  const { isStreaming, viewer: liveViewer } = liveDetailData || {};

  return (
    <span className="flex items-center gap-1">
      <FaEye />
      {isStreaming && viewer !== 0
        ? viewer
        : isStreaming && liveViewer
        ? liveViewer
        : 0}
    </span>
  );
};

export default function LiveMobile() {
  const { id } = useParams();
  const { data } = useLiveDetail(id);
  const liveData = data?.data?.data;
  const isStreaming = liveData?.isStreaming;
  const navigate = useNavigate();
  const { deviceType } = useDevice();
  const isMobile = deviceType === screenType.MOBILE;

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: "F8BET Live",
        text: "Hãy xem thử livestream của chúng tôi!!!",
        url: window.location.href,
      });
    }
  }, []);

  useEffect(() => {
    if (!isMobile) {
      navigate(`/live/${id}`);
    }
  }, [isMobile, id, navigate]);

  return (
    <div
      className={`relative w-full h-[100dvh] overflow-hidden transition-all duration-300 ease-in-out`}
    >
      <div
        className={`w-full overflow-hidden flex flex-col justify-between h-full`}
      >
        <div className="w-full h-fit z-10 px-2 pt-3 flex items-center justify-between">
          <div className="pr-2 rounded-full flex items-center gap-2">
            <div>
              <Avatar src={liveData?.avatar} />
            </div>
            <div className="flex flex-col text-[var(--color-brand-primary)] text-[9px]">
              <span>{liveData?.displayName}</span>
              <ViewerCount
                isStreaming={isStreaming}
                liveDetailData={liveData}
              />
            </div>
          </div>
          {!isStreaming && <Countdown time={liveData?.scheduleTime} />}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className={`text-white xl:text-base
              flex items-center space-x-2 text-[10px]
              py-1 px-2 animate-blink`}
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
            <IoCloseSharp
              className="text-[var(--color-brand-primary)] text-2xl"
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        <div className="w-full z-0 px-2">
          <LivestreamPlayer liveId={id} />
          {/* <IdolRating /> */}
        </div>

        <div className="z-10 mx-2">
          <div className="w-full h-fit border border-[var(--color-brand-primary)] rounded-xl bg-gradient-to-b from-white to-[var(--color-brand-primary-lighter)]">
            <div
              className={`bg-[var(--color-brand-primary)] 
                text-white text-[16px] text-center uppercase 
                rounded-lg font-bold py-[10px]
                m-2
                `}
            >
              bình luận
            </div>
            <AdaptiveChatBar />
          </div>
        </div>
      </div>
    </div>
  );
}
