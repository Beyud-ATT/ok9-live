import { Flex } from "antd";
import { useLayoutContext } from "../Index";
import Logo from "../../components/Logo";
import TopNav from "./PC/TopNav";
import BurgerTopNav from "./Mobile/BurgerTopNav";
import GroupButton from "./GroupButton";
import { Link } from "react-router";
import UserActionDropdown from "./PC/UserActionDropDown";
import DeviceProvider from "../../contexts/ResponsiveContext";
import UserActionDrawer from "./Mobile/UserActionDrawer";

export default function BaseHeader({ ...rest }) {
  const { Header } = useLayoutContext();
  return (
    <Header
      {...rest}
      style={{
        border: "0.5px solid rgba(0, 18, 45, 0.06)",
        background:
          "linear-gradient(180deg, #FFF 0%, var(--color-brand-primary-lighter) 100%)",
        boxShadow:
          "0px 1px 0.1px 0px rgba(54, 166, 56, 0.25), 0px 4px 7.7px 0px rgba(54, 166, 56, 0.13), 0px -1px 5.5px 0px rgba(54, 166, 56, 0.20) inset, 0px 2px 2.7px 2px #FFF inset",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        className="max-w-[1200px] mx-auto md:py-2 py-4 lg:px-8 px-4"
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
          <Link to="/">
            <Logo />
          </Link>
          <TopNav />
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
