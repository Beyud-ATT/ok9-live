import { Flex, Image } from "antd";
import { useLayoutContext } from "../Index";
import { Link } from "react-router";
// import FooterBg from "../../assets/footer-bg.webp";
import Fukada from "../../assets/fukada.webp";
import Degea from "../../assets/degea.webp";
import FukadaSignature from "../../assets/fukada-signature.webp";
import DegeaSignature from "../../assets/degea-signature.webp";

import {
  Footer1,
  Footer3,
  Footer4,
  Footer5,
  Footer6,
  Footer7,
  Footer8,
  Footer9,
  Footer10,
  Footer11,
  Footer12,
  Footer2,
  Footer13,
} from "../../utils/svg";
import Logo from "../../components/Logo";
import Description from "./Description";

const Ambassadors = [
  {
    img: Degea,
    signature: <Image src={DegeaSignature} alt="degea-signature" />,
    text: (
      <>
        <p>David de gea</p>
        <p>Năm 2024 - 2025</p>
      </>
    ),
  },
  {
    img: Fukada,
    signature: <Image src={FukadaSignature} alt="fukada-signature" />,
    text: (
      <>
        <p>Eimi Fukada</p>
        <p>Năm 2024 - 2025</p>
      </>
    ),
  },
];

function BrandAmbassador({ img, signature, text }) {
  return (
    <Flex gap={5} justify="center">
      <Flex>
        <Image src={img} alt="Ambassador" preview={false} />
      </Flex>
      <Flex vertical justify="end" gap={10}>
        <div>{signature}</div>
        <p className="text-[12px] whitespace-nowrap text-[#878EA6]">{text}</p>
      </Flex>
    </Flex>
  );
}

export default function BaseFooter() {
  const { Footer } = useLayoutContext();

  return (
    <Footer className="lg:block w-full hidden mt-8 pb-0 px-0 bg-[var(--background-footer)]">
      <Flex
        vertical
        justify="center"
        align="center"
        className="max-w-screen-xl mx-auto mt-6 text-[var(--text-color)] px-4 mb-6"
        gap={26}
      >
        <div className="w-full flex gap-10 items-center">
          <div className="flex flex-col gap-12 justify-end align-center w-[50%]">
            <Flex vertical justify="center" gap={17}>
              <Logo width={198} height={94} />
              <Description />
            </Flex>
          </div>

          <div className="flex flex-col gap-5 w-[50%]">
            <div className="flex align-center gap-10">
              <div className="flex flex-col items-center justify-center">
                <p className="capitalize font-bold text-xl text-[#D6D6D6]">
                  Đại sứ thương hiệu
                </p>
              </div>
            </div>
            <Flex gap={30} align="center" className="w-full">
              {Ambassadors.map((item) => (
                <BrandAmbassador key={item.text} {...item} />
              ))}
            </Flex>
          </div>
        </div>

        <Flex gap={4} align="center" justify="space-between" className="w-full">
          <Footer1 />
          <Footer2 />
          <Footer3 />
          <Footer4 />
          <Footer5 />
          <Footer6 />
          <Footer7 />
          <Footer8 />
          <Footer9 />
          <Footer10 />
          <Link to="https://f8page10.com/F8BETgiaitri" target="_blank">
            <Footer11 />
          </Link>
          <Link to="https://www.facebook.com/f8betgiaitri0" target="_blank">
            <Footer12 />
          </Link>
          <Link to="https://www.youtube.com/@F8BETgiaitri0" target="_blank">
            <Footer13 />
          </Link>
        </Flex>

        <Flex gap={4} align="center" justify="space-between" className="w-full">
          <Link to="/rule" className="xl:text-[16px] text-[12px]">
            Điều Khoản Và Điều Kiện
          </Link>
          <span>|</span>
          <Link to="#" className="xl:text-[16px] text-[12px]">
            Giới Thiệu Về F8BET
          </Link>
          <span>|</span>
          <Link to="#" className="xl:text-[16px] text-[12px]">
            Chơi Có Trách Nhiệm
          </Link>
          <span>|</span>
          <Link to="#" className="xl:text-[16px] text-[12px]">
            Miễn Trách Nhiệm
          </Link>
          <span>|</span>
          <Link to="#" className="xl:text-[16px] text-[12px]">
            Quyền Riêng Tư Tại F8BET
          </Link>
          <span>|</span>
          <Link to="#" className="xl:text-[16px] text-[12px]">
            Những Câu Hỏi Thường Gặp
          </Link>
        </Flex>

        <div>Copyright © F8BET.COM Reserved</div>
      </Flex>
    </Footer>
  );
}
