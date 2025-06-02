import { Row, Col } from "antd";
// import TopInteraction from "../../components/TopInteraction";
// import OnlineTable from "../../components/OnlineTable";
// import IdolHot from "../../components/IdolTop";
// import PromotionSlider from "../../components/PromotionSlide";
import NewsTab from "../../components/NewsTab";
import LivestreamPlayer from "../../components/VideoPlayer";
import { useNavigate, useParams } from "react-router";
import { screenType, useDevice } from "../../contexts/ResponsiveContext";
import { useEffect } from "react";
// import LiveTabs from "./LiveTabs";
// import IdolRating from "../../components/IdolRating";
import Header from "./Header";
import { ChatInterface } from "./Chat";
import Marquee from "../../components/Marquee";
import PromoHot from "../../components/PromoHot";
import FeedBack from "../../components/FeedBack";
import BannerSection from "../Home/BannerSection";

const LivestreamDetail = ({ ...rest }) => {
  const { id } = useParams();
  const { deviceType } = useDevice();
  const isMobile = deviceType !== screenType.MOBILE;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      navigate(`/live-mobile/${id}`);
    }
  }, [isMobile, id, navigate]);

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="my-4">
        <Marquee />
      </div>

      <div className="my-4 lg:block hidden">
        <BannerSection />
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={{ flex: "100%" }} md={{ flex: "70%" }}>
          {/* <Header /> */}
          <LivestreamPlayer liveId={id} />
        </Col>
        <Col
          xs={{ flex: "100%" }}
          md={{ flex: "30%" }}
          className="!overflow-hidden !pl-0"
        >
          <div className="w-[95%] ml-auto h-fit border border-[var(--color-brand-primary)] rounded-xl bg-gradient-to-b from-white to-[var(--color-brand-primary-lighter)]">
            <div
              className={`bg-[var(--color-brand-primary)] 
                text-white text-[16px] text-center uppercase 
                rounded-lg font-bold py-[10px]
                m-2
                `}
            >
              bình luận
            </div>
            <ChatInterface />
          </div>
        </Col>
      </Row>
      {/* <div className="mt-16">
        <TopInteraction />
      </div>
      <div className="mt-11">
        <OnlineTable />
      </div> */}
      {/* <div className="mt-3">
        <PromotionSlider />
      </div> */}
      {/* <div>
        <IdolHot />
      </div> */}
      {/* <div>
        <IdolRating />
      </div> */}
      <div className="lg:mt-8 mt-4">
        <NewsTab />
      </div>
      <div className="lg:mt-8 mt-4">
        <PromoHot />
      </div>
      <div className="lg:mt-8 mt-4">
        <FeedBack />
      </div>
    </div>
  );
};

export default LivestreamDetail;
