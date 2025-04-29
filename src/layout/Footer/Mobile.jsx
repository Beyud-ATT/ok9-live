import { Col, Flex, Image, Row, Typography } from "antd";
import { useLayoutContext } from "../Index";
import {
  Footer2,
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
  Footer13,
  Footer1Mobile,
  Footer10Mobile,
  Footer3Mobile,
} from "../../utils/svg";
import Logo from "../../components/Logo";
import FukadaMobile from "../../assets/fukada-mobile.webp";
import DegeaMobile from "../../assets/degea-mobile.webp";
import PartialBg from "../../assets/XanhVIP.webp";
import { Link } from "react-router";

const fill = "#0053E0";

export default function MobileFooter() {
  const { Footer } = useLayoutContext();

  return (
    <Footer className={`lg:hidden block p-0 mt-12`}>
      <Flex vertical gap={24} className={`max-w-screen-sm mx-auto px-6`}>
        <Typography.Title
          level={5}
          className="!text-[#0053E0] !font-bold capitalize !mb-0"
        >
          Đại Sứ Thương Hiệu
        </Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Flex vertical gap={10} justify="center">
              <Image src={DegeaMobile} width={82} height={36} />
              <div className="text-[#0053E0] text-[9px]">
                <p>David de gea</p>
                <p>Năm 2024 - 2025</p>
              </div>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex
              vertical
              gap={10}
              justify="center"
              className="pl-6 md:items-end items-start"
            >
              <Image src={FukadaMobile} width={83} height={35} />
              <div className="text-[#0053E0] text-[9px]">
                <p>Eimi Fukada</p>
                <p>Năm 2024 - 2025</p>
              </div>
            </Flex>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Flex vertical gap={10}>
              <p className="capitalize text-[#0053E0] text-[15px]">giấy phép</p>
              <div className="md:w-[60%] w-full space-y-2">
                <Row>
                  <Col span={10}>
                    <Footer6 width={53} height={18} fill={fill} />
                  </Col>
                  <Col span={6}>
                    <Footer7 width={20} height={20} fill={fill} />
                  </Col>
                  <Col span={6}>
                    <Footer8 width={19} height={20} fill={fill} />
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Footer5 width={36} height={19} fill={fill} />
                  </Col>
                  <Col span={12}>
                    <Footer1Mobile />
                  </Col>
                </Row>
              </div>
            </Flex>
          </Col>

          <Col span={12}>
            <Flex vertical gap={12} className="pl-6 md:items-end items-start">
              <p className="capitalize text-[#0053E0] text-[15px]">bảo vệ</p>
              <Flex vertical gap={12} className="md:items-end items-start">
                <Footer10Mobile />
                <Footer3Mobile />
              </Flex>
            </Flex>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Flex vertical gap={8}>
              <p className="capitalize text-[#0053E0] text-[15px]">
                theo dõi chúng tôi
              </p>
              <Row className="md:w-[60%] w-full">
                <Col span={6}>
                  <Link to="https://f8page10.com/F8BETgiaitri" target="_blank">
                    <Footer11 width={20} height={20} fill={fill} />
                  </Link>
                </Col>
                <Col span={6}>
                  <Link
                    to="https://www.facebook.com/f8betgiaitri0"
                    target="_blank"
                  >
                    <Footer12 width={20} height={20} fill={fill} />
                  </Link>
                </Col>
                <Col span={6}>
                  <Link
                    to="https://www.youtube.com/@F8BETgiaitri0"
                    target="_blank"
                  >
                    <Footer13 width={20} height={20} fill={fill} />
                  </Link>
                </Col>
              </Row>
            </Flex>
          </Col>

          <Col span={12}>
            <Flex vertical className="pl-6 md:items-end items-start" gap={8}>
              <p className="capitalize text-[#0053E0] text-[15px]">
                chơi có trách nhiệm
              </p>
              <Flex gap={20}>
                <Footer9 width={20} height={20} fill={fill} />
                <Footer2 width={20} height={20} fill={fill} />
                <Footer4 width={28} height={20} fill={fill} />
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Flex>

      <Flex
        vertical
        align="center"
        className="bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${PartialBg})` }}
      >
        <div className="px-6 mb-4">
          <Typography.Title level={4} className=" text-center pt-6 !font-bold ">
            <Logo forcePC width={128} height={61} />
          </Typography.Title>
          <p className="text-justify text-[#0053E0]">
            F8BET là một nhà cái có giấy phép cá cược trực tuyến hợp pháp do
            Isle of Man và Khu kinh tế Cagayan and Freeport cấp. Với bề dày kinh
            nghiệm và danh tiếng phục vụ hơn 10 triệu người chơi, F8BET đã và
            đang khẳng định vị thế của mình trên thị trường game trực tuyến. Với
            tư cách là một công ty trò chơi trực tuyến có trụ sở tại Luân Đôn,
            Anh, sở hữu đội ngũ nhân tài chuyên nghiệp đông đảo cung cấp sản
            phẩm phục vụ chất lượng cao. F8BET đảm bảo không tiết lộ thông tin
            cá nhân khách hàng cho bất kỳ bên thứ ba nào, sử dụng tiêu chuẩn mã
            hoá dữ liệu ở mức cao nhất. Tất cả thông tin cá nhân đều được thông
            qua hệ thống bảo mật - Secure Socket (Chuẩn mã hóa SS 128-bit), đồng
            thời được bảo vệ trong môi trường quản lý an toàn đảm bảo không thể
            truy cập từ các khu vực mạng công cộng. Tất cả dữ liệu ra vào đều bị
            hạn chế, giám sát nghiêm ngặt và quản lý chặt chẽ nhằm mang đến cho
            người chơi trải nghiệm người dùng an toàn tuyệt đối.
          </p>
        </div>
      </Flex>
    </Footer>
  );
}
