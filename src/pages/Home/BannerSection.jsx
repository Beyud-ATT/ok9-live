import { Button, Flex, Image } from "antd";
import Banner from "../../assets/banner-main.png";
import DownloadNow from "../../assets/download-now.gif";
import { Hono } from "../../utils/svg";
import { Link } from "react-router";
import useGetGeneralLinks from "../../hooks/useGetGeneralLinks";

export default function BannerSection() {
  const { generalLinks } = useGetGeneralLinks();
  const { linkWeb, linkApp } = generalLinks?.data?.data || {};
  return (
    <div>
      <Flex className="w-full">
        <Flex className="md:w-[80%] w-full">
          <Link to={linkWeb} target="_blank">
            <Image
              src={Banner}
              alt="Banner Main"
              loading="lazy"
              preview={false}
            />
          </Link>
        </Flex>
        <Flex justify="end" className="w-[20%] md:block hidden">
          <Flex
            vertical
            justify="space-around"
            align="center"
            className="h-full"
          >
            <Link to={linkApp} target="_blank">
              <Image
                src={DownloadNow}
                alt="Download Now"
                className="w-full"
                loading="lazy"
                preview={false}
              />
            </Link>
            <Button
              variant="solid"
              className="w-[85%] bg-[var(--color-brand-primary)] hover:!bg-orange-500 border-none cursor-pointer text-white hover:!text-gray-100 px-4 py-2 rounded-lg font-bold"
            >
              <Hono /> KÊNH LIVE HOT
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
