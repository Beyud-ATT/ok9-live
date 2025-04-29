import { Button, Flex } from "antd";
import { CompoundModal } from "../../components/CompoundModal";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import { useAuth } from "../../contexts/AuthContext";

export default function GroupButton() {
  const { isAuthenticated } = useAuth();

  return (
    !isAuthenticated && (
      <Flex className="md:gap-3 gap-1">
        <CompoundModal>
          <CompoundModal.Trigger
            render={(openModal) => (
              <Button
                id="login-button"
                className="border-none !text-[#3F4F75] font-medium capitalize lg:!text-base !text-[12px]"
                onClick={openModal}
                style={{
                  borderRadius: "42.707px",
                  border: "0.485px solid rgba(0, 0, 0, 0.20)",
                  background:
                    "radial-gradient(76.16% 76.16% at 31.97% 19.67%, #FFF 0%, rgba(255, 255, 255, 0.00) 69.79%, rgba(255, 255, 255, 0.00) 100%), #F1F1F1",
                  boxShadow:
                    "0px 1.941px 4.562px 0px rgba(0, 0, 0, 0.07), 0px -2.912px 7.765px 0px rgba(255, 255, 255, 0.25) inset, 5.824px 8.735px 8.735px 0px rgba(255, 255, 255, 0.60) inset, 0px 1.941px 1.941px 0px rgba(255, 255, 255, 0.60) inset, -9.706px -11.647px 17.471px 0px rgba(91, 216, 255, 0.10) inset, 2.912px 3.882px 7.765px 0px rgba(255, 255, 255, 0.70)",
                }}
              >
                Đăng nhập
              </Button>
            )}
          />
          <CompoundModal.Content
            className="!bg-[var(--background-color)] border-[2px] border-[#C0C0C0] !rounded-3xl !pb-0"
            classNames={{
              content: "!rounded-3xl !bg-transparent",
              mask: "backdrop-blur-md",
            }}
            centered={true}
          >
            <LoginForm />
          </CompoundModal.Content>
        </CompoundModal>

        <CompoundModal>
          <CompoundModal.Trigger
            render={(openModal) => (
              <Button
                id="signup-button"
                className="border-none capitalize px-5 py-1 text-white font-medium lg:!text-base !text-[12px]"
                onClick={openModal}
                style={{
                  borderRadius: "105.797px",
                  background: `radial-gradient(107.08% 85.59% at 86.3% 87.5%, rgba(0, 0, 0, 0.23) 0%, rgba(0, 0, 0, 0.00) 86.18%), radial-gradient(83.94% 83.94% at 26.39% 20.83%, rgba(255, 255, 255, 0.41) 0%, rgba(255, 255, 255, 0.00) 69.79%, rgba(255, 255, 255, 0.00) 100%), #2F6EFF`,
                  boxShadow:
                    "-2.912px -3.882px 6.794px 0px rgba(255, 255, 255, 0.15) inset",
                }}
              >
                Đăng ký
              </Button>
            )}
          />
          <CompoundModal.Content
            className="!bg-[var(--background-color)] border-[2px] border-[#C0C0C0] !rounded-3xl !pb-0"
            classNames={{
              content: "!rounded-3xl !bg-transparent",
              mask: "backdrop-blur-md",
            }}
            centered={true}
          >
            <SignUpForm />
          </CompoundModal.Content>
        </CompoundModal>
      </Flex>
    )
  );
}
