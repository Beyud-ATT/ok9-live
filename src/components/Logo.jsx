import { Image } from "antd";
import LogoImg from "../assets/logo.png";
import LogoMBImg from "../assets/mobile-logo.png";
import { screenType, useDevice } from "../contexts/ResponsiveContext";

export default function Logo({ forcePC, ...rest }) {
  const { deviceType } = useDevice();
  const isMobile = deviceType === screenType.MOBILE;

  return (
    <>
      <Image
        src={isMobile && !forcePC ? LogoMBImg : LogoImg}
        alt="logo"
        loading="lazy"
        preview={false}
        width={isMobile ? 80 : 193}
        height={isMobile ? 32 : 80}
        {...rest}
      />
    </>
  );
}
