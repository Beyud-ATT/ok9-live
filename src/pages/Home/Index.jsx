// import IdolHot from "../../components/IdolTop";
import FeedBack from "../../components/FeedBack";
import Marquee from "../../components/Marquee";
import NewsTab from "../../components/NewsTab";
import PromoHot from "../../components/PromoHot";
// import OnlineTable from "../../components/OnlineTable";
// import PromotionSlider from "../../components/PromotionSlide";
// import TopInteraction from "../../components/TopInteraction";
import BannerSection from "./BannerSection";
import LiveSection from "./LiveSection";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="my-4">
        <Marquee />
      </div>
      <div className="md:mb-4 mt-2">
        <BannerSection />
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
}
