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
import IdolRating from "../../components/IdolRating";
import Header from "./Header";
import { ChatInterface } from "./Chat";
import Marquee from "../../components/Marquee";
import PromoGIF from "../../components/PromoGIF";

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
      <div className="mb-4">
        <Marquee />
      </div>
      <div>
        <PromoGIF />
      </div>
      <Row gutter={[16, 16]}>
        <Col
          xs={{ flex: "100%" }}
          md={{ flex: "65%" }}
          lg={{ flex: "65%" }}
          xl={{ flex: "70%" }}
        >
          <Header />
          <LivestreamPlayer liveId={id} />
        </Col>
        <Col
          xs={{ flex: "100%" }}
          md={{ flex: "35%" }}
          lg={{ flex: "35%" }}
          xl={{ flex: "30%" }}
          className="!overflow-hidden"
        >
          <div
            className="w-full h-fit border border-[var(--color-brand-primary)] rounded-xl"
            style={{ boxShadow: "0px 2px 0px 0px #02A9DC" }}
          >
            <div
              className={`bg-[var(--color-brand-primary-lighter)] 
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
      <div>
        <IdolRating />
      </div>
      <div className="mt-8">
        <NewsTab />
      </div>
    </div>
  );
};

export default LivestreamDetail;
