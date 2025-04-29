import LiveBanner from "../assets/live-banner.gif";
import LiveBannerMB from "../assets/live-banner-mb.gif";
import { screenType, useDevice } from "../contexts/ResponsiveContext";
import { Image } from "antd";

export default function PromoGIF() {
  const { deviceType } = useDevice();
  const banner = deviceType === screenType.MOBILE ? LiveBannerMB : LiveBanner;

  return <Image src={banner} preview={false} className="py-4" />;
}
