import { Button, Flex, Image } from "antd";
import Banner from "../../assets/banner-main.png";
import DownloadNow from "../../assets/download-now.png";
import Android from "../../assets/android.png";
import IOS from "../../assets/ios.png";
import { Hono } from "../../utils/svg";
import { Link } from "react-router";
import useGetGeneralLinks from "../../hooks/useGetGeneralLinks";

export default function BannerSection() {
  const { generalLinks } = useGetGeneralLinks();
  const { linkWeb, linkApp } = generalLinks?.data?.data || {};
  return (
    <div>
      <Flex className="w-full">
        <Flex className="md:w-[70%] w-full">
          <Link to={linkWeb} target="_blank">
            <Image
              src={Banner}
              alt="Banner Main"
              loading="lazy"
              preview={false}
            />
          </Link>
        </Flex>
        <Flex justify="end" className="w-[30%] md:block hidden">
          <Flex
            justify="space-around"
            align="center"
            className="h-full w-[85%] mx-auto gap-2"
            style={{
              borderRadius: "10.017px",
              border: "0.501px solid rgba(0, 18, 45, 0.06)",
              background:
                "linear-gradient(180deg, #FFF 0%, var(--color-brand-primary-lighter) 100%)",
              boxShadow:
                "0px 1.002px 0.1px 0px rgba(54, 166, 56, 0.25), 0px 4.007px 7.713px 0px rgba(54, 166, 56, 0.13), 0px -1.002px 5.509px 0px rgba(54, 166, 56, 0.20) inset, 0px 2.003px 2.705px 2.003px #FFF inset",
            }}
          >
            <div>
              <Image
                src={DownloadNow}
                alt="Download Now"
                className="w-full"
                loading="lazy"
                preview={false}
              />
            </div>
            <Flex
              vertical
              justify="center"
              align="center"
              className="rounded-lg py-2 px-3 border border-[var(--color-brand-primary)] bg-gradient-to-b from-white to-[var(--color-brand-primary-lighter)]"
            >
              <Image src={IOS} alt="IOS" preview={false} />
              <p className="text-[#8E8E8E] font-sfProDisplay text-[12px] font-medium uppercase">
                ios
              </p>
              <button
                className="capitalize font-sfProDisplay text-white py-1 px-2 text-[7px] font-medium whitespace-nowrap"
                style={{
                  borderRadius: "39.036px",
                  background: "#36A638",
                  boxShadow:
                    "-1.074px -1.433px 2.507px 0px rgba(255, 255, 255, 0.15) inset",
                }}
              >
                tải ngay
              </button>
            </Flex>
            <Flex
              vertical
              justify="center"
              align="center"
              className="rounded-lg py-2 px-3 border border-[var(--color-brand-primary)] bg-gradient-to-b from-white to-[var(--color-brand-primary-lighter)]"
            >
              <Image src={Android} alt="Android" preview={false} />
              <p className="text-[#8E8E8E] font-sfProDisplay text-[12px] font-medium capitalize">
                android
              </p>
              <button
                className="capitalize font-sfProDisplay text-white py-1 px-2 text-[7px] font-medium whitespace-nowrap"
                style={{
                  borderRadius: "39.036px",
                  background: "#36A638",
                  boxShadow:
                    "-1.074px -1.433px 2.507px 0px rgba(255, 255, 255, 0.15) inset",
                }}
              >
                tải ngay
              </button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
