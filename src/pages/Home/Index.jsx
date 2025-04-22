// import IdolHot from "../../components/IdolTop";
import Marquee from "../../components/Marquee";
import NewsTab from "../../components/NewsTab";
// import OnlineTable from "../../components/OnlineTable";
import PromotionSlider from "../../components/PromotionSlide";
// import TopInteraction from "../../components/TopInteraction";
import BannerSection from "./BannerSection";
import LiveSection from "./LiveSection";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto">
      {/* <div>
        <BannerSection />
      </div> */}
      <div>
        <Marquee />
      </div>
      <div>
        <LiveSection />
      </div>
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
      <div className="mt-8">
        <NewsTab />
      </div>
    </div>
  );
}
