import { Col, Flex, Image, Row } from "antd";
import LeftNav from "./LeftNav";
import { Outlet } from "react-router";
import DeviceProvider from "../../contexts/ResponsiveContext";
import useAccount from "../../hooks/useAccount";

function UserProfileFrame({ data }) {
  return (
    <div className="relative w-[260px] h-[160px] lg:-translate-y-1/4 bg-[url('/user-frame.png')] bg-contain bg-center bg-no-repeat">
      <div className="z-10 absolute top-[34px] left-[76px] translate-x-1 w-[100px] h-[100px] rounded-full overflow-hidden">
        <Flex
          vertical
          justify="center"
          align="center"
          className="w-full h-full"
        >
          {data?.avatar && (
            <Image
              src={data?.avatar}
              alt="Avatar"
              preview={false}
              loading="lazy"
              className="overflow-hidden rounded-full"
            />
          )}
        </Flex>
      </div>
    </div>
  );
}

export default function User() {
  const { data: res } = useAccount();
  const accoutnData = res?.data?.data;

  return (
    <Flex className="w-full max-w-screen-2xl mx-auto">
      <DeviceProvider.PC>
        <LeftNav />
      </DeviceProvider.PC>
      <div className="flex-1">
        {/* Profile Header */}
        <DeviceProvider.PC>
          <div className="flex items-center bg-gradient-to-r from-[#362AD6] via-[#9067EA] to-[#EAE5BF] h-[120px]"></div>
        </DeviceProvider.PC>

        {/* Content Area */}
        <div className="md:bg-[var(--background-color-2)] h-full w-full">
          <Row>
            {/* Profile Information */}
            <Col span={24} xs={24} md={24} lg={24} xl={16}>
              <div className="flex lg:flex-row flex-col items-center justify-center gap-4 lg:mb-0 mb-4">
                <UserProfileFrame data={accoutnData} />
                <div className="flex flex-col justify-end lg:text-left text-center space-y-3">
                  <h2 className="text-xl font-bold text-[var(--color-brand-primary)]">
                    {accoutnData?.displayName || "User Name"}
                  </h2>
                  <p className="text-gray-400">
                    Donate: <span className="text-yellow-500">0</span> | Số dư
                    chuyển đổi: <span className="text-yellow-500">0</span>
                  </p>
                </div>
              </div>
            </Col>

            {/* Place where you want to change content */}
            <Col span={24} xs={24} md={24} lg={24} xl={24}>
              <div className="flex flex-col items-center justify-center">
                <Outlet />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Flex>
  );
}
