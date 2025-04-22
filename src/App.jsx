import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { BaseLayout } from "./layout/Index";
import Home from "./pages/Home/Index.jsx";
import LivestreamDetail from "./pages/Live/Index.jsx";
import User from "./pages/User/Index.jsx";
import ProfileForm from "./pages/User/Profile/Index.jsx";
import ChangePasswordForm from "./pages/User/ForgotPassword/Index.jsx";
import LivestreamConfigForm from "./pages/User/LivestreamsConfig/Index.jsx";
import Rule from "./pages/Rule/Index.jsx";
import Privacy from "./pages/Privacy/Index.jsx";
import NotFound from "./pages/404.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import LiveMobile from "./pages/LiveMobile/Index.jsx";
import { BareChatFrame } from "./pages/Live/Chat.jsx";
import BlackList from "./pages/User/BlackList/Index.jsx";
import { ErrorBoundary } from "react-error-boundary";
import Error500 from "./pages/500.jsx";
import Gift from "./pages/Gift/Index.jsx";
import GiftDetail from "./pages/Gift/Detail/Index.jsx";
import { Flex } from "antd";
import Logo from "./components/Logo.jsx";

function App() {
  const { isIdol } = useAuth();
  return (
    <>
      <Routes>
        <Route
          element={
            <ErrorBoundary fallback={<Error500 />}>
              <BaseLayout />
            </ErrorBoundary>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/live/:id" element={<LivestreamDetail />} />
          <Route path="/live-mobile/:id" element={<LiveMobile />} />
          <Route path="/user" element={<User />}>
            <Route index path="profile" element={<ProfileForm />} />
            <Route path="forgot-password" element={<ChangePasswordForm />} />
            {isIdol && (
              <Route
                path="livestreams-config"
                element={<LivestreamConfigForm />}
              />
            )}
            <Route path="black-list" element={<BlackList />} />
          </Route>
          <Route path="/rule" element={<Rule />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* <Route path="/gift" element={<Gift />} />
          <Route path="/gift/:id" element={<GiftDetail />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/chat-box/:id" element={<BareChatFrame />} />
        <Route path="/500" element={<Error500 />} />
        {/* <Route
          path="*"
          element={
            <Flex
              vertical
              justify="center"
              align="center"
              className="h-screen bg-black"
              gap={20}
            >
              <Logo />
              <p className="text-[var(--color-brand-primary)] text-2xl font-bold">
                Bảo trì ít phút, vui lòng quay lại sau
              </p>
            </Flex>
          }
        /> */}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
