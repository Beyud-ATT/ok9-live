import { Flex, Layout } from "antd";
import { Outlet, useLocation } from "react-router";
import BaseFooter from "./Footer/Index";
import BaseContent from "./Content";
import BaseHeader from "./Header/Index";
import { createContext, useContext } from "react";
import { screenType, useDevice } from "../contexts/ResponsiveContext";
import MobileFooter from "./Footer/Mobile";

const LayoutContext = createContext();

function BaseLayout() {
  const { Header, Footer, Sider, Content } = Layout;
  const isUserPage = useLocation().pathname.includes("user");
  const isLiveMobilePage = useLocation().pathname.includes("live-mobile");
  const isLivePage = useLocation().pathname.includes("live");
  const isGiftPage = useLocation().pathname.includes("gift");
  const isShow = !isUserPage && !isLiveMobilePage && !isLivePage;

  const isShowMobile = useDevice().deviceType === screenType.MOBILE || isShow;

  return (
    <LayoutContext.Provider value={{ Header, Footer, Sider, Content }}>
      <Flex
        gap="middle"
        className="bg-[var(--background-color)] min-h-dvh"
        wrap
      >
        <Layout>
          <BaseHeader
            className={`${
              !isLiveMobilePage
                ? "block opacity-100 visible"
                : "hidden opacity-0 invisible"
            }`}
          />
          <BaseContent
            className={`${
              isShow && !isGiftPage ? "lg:px-8 px-4 pt-4" : ""
            } overflow-y-auto`}
          >
            <Outlet />
          </BaseContent>
          {!isGiftPage && !isUserPage && !isLiveMobilePage && <BaseFooter />}
          {isShowMobile && <MobileFooter />}
        </Layout>
      </Flex>
    </LayoutContext.Provider>
  );
}

function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
}

export { BaseLayout, useLayoutContext };
