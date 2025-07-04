import { Flex } from "antd";
import { useLayoutContext } from "../Index";
import Logo from "../../components/Logo";
import TopNav from "./PC/TopNav";
import BurgerTopNav from "./Mobile/BurgerTopNav";
import GroupButton from "./GroupButton";
import { Link } from "react-router";
import UserActionDropdown from "./PC/UserActionDropDown";
import DeviceProvider, {
  screenType,
  useDevice,
} from "../../contexts/ResponsiveContext";
import UserActionDrawer from "./Mobile/UserActionDrawer";
import HeaderPCBG from "../../assets/header-pc-bg.gif";
import HeaderMBBG from "../../assets/header-mobile-bg.gif";
import { backIn } from "framer-motion";

export default function BaseHeader({ ...rest }) {
  const { Header } = useLayoutContext();
  const { deviceType } = useDevice();
  return (
    <Header
      {...rest}
      style={{
        border: "0.5px solid rgba(0, 18, 45, 0.06)",
        backgroundImage: `url(${
          deviceType === screenType.PC ? HeaderPCBG : HeaderMBBG
        })`,
        backgroundPosition: "center",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        className="max-w-[1200px] mx-auto md:py-2 py-4 lg:px-0 px-2"
      >
        <DeviceProvider.MOBILE>
          <Flex align="center" gap={5}>
            <BurgerTopNav />
            <Link to="/">
              <Logo />
            </Link>
          </Flex>
        </DeviceProvider.MOBILE>

        <DeviceProvider.PC>
          <Link to="/">
            <Logo />
          </Link>
          <TopNav />
          <UserActionDropdown />
        </DeviceProvider.PC>

        <DeviceProvider.TABLET>
          <Flex align="center" gap={5}>
            <BurgerTopNav />
            <Link to="/">
              <Logo />
            </Link>
          </Flex>
          {/* <TopNav /> */}
          <UserActionDrawer />
        </DeviceProvider.TABLET>

        <GroupButton />
        <DeviceProvider.MOBILE>
          <UserActionDrawer />
        </DeviceProvider.MOBILE>
      </Flex>
    </Header>
  );
}
