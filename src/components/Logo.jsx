import { Image } from "antd";
import LogoImg from "../assets/logo.webp";

export default function Logo(props) {
  return (
    <>
      <Image
        src={LogoImg}
        alt="logo"
        loading="lazy"
        preview={false}
        width={127}
        height={56}
        {...props}
      />
    </>
  );
}
