import { Button, Flex } from "antd";
import { CompoundModal } from "../../components/CompoundModal";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import { useAuth } from "../../contexts/AuthContext";

export default function GroupButton() {
  const { isAuthenticated } = useAuth();

  return (
    !isAuthenticated && (
      <Flex className="md:gap-3 gap-2 md:flex-row flex-col">
        <CompoundModal>
          <CompoundModal.Trigger
            render={(openModal) => (
              <Button
                id="login-button"
                className="!bg-[var(--color-brand-primary)] !text-white border-[var(--color-brand-primary)] rounded-full lg:!text-base md:!text-[12px] !text-[10px]"
                onClick={openModal}
                style={{
                  borderRadius: "109px",
                  background:
                    "radial-gradient(107.08% 85.59% at 86.3% 87.5%, rgba(0, 0, 0, 0.23) 0%, rgba(0, 0, 0, 0.00) 86.18%), radial-gradient(83.94% 83.94% at 26.39% 20.83%, rgba(255, 255, 255, 0.41) 0%, rgba(255, 255, 255, 0.00) 69.79%, rgba(255, 255, 255, 0.00) 100%), var(--color-brand-primary)",
                  boxShadow:
                    "-3px -4px 7px 0px rgba(255, 255, 255, 0.15) inset",
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
              body: "mt-8",
              mask: "backdrop-blur-md",
            }}
            centered={true}
            style={{
              background:
                "radial-gradient(71.52% 71.52% at 50% 100%, #44331C 0%, #101010 100%)",
            }}
          >
            <LoginForm />
          </CompoundModal.Content>
        </CompoundModal>

        <CompoundModal>
          <CompoundModal.Trigger
            render={(openModal) => (
              <Button
                id="signup-button"
                variant="filled"
                className="border-none text-[#3F4F75] rounded-full lg:!text-base md:!text-[12px] !text-[10px]"
                onClick={openModal}
                style={{
                  borderRadius: "44px",
                  border: "0.5px solid rgba(0, 0, 0, 0.20)",
                  background:
                    "radial-gradient(76.16% 76.16% at 31.97% 19.67%, #FFF 0%, rgba(255, 255, 255, 0.00) 69.79%, rgba(255, 255, 255, 0.00) 100%), #F1F1F1",
                  boxShadow:
                    "0px 2px 4.7px 0px rgba(0, 0, 0, 0.07), 0px -3px 8px 0px rgba(255, 255, 255, 0.25) inset, 6px 9px 9px 0px rgba(255, 255, 255, 0.60) inset, 0px 2px 2px 0px rgba(255, 255, 255, 0.60) inset, -10px -12px 18px 0px rgba(91, 216, 255, 0.10) inset, 3px 4px 8px 0px rgba(255, 255, 255, 0.70)",
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
              body: "mt-8",
              mask: "backdrop-blur-md",
            }}
            centered={true}
            style={{
              background:
                "radial-gradient(71.52% 71.52% at 50% 100%, #44331C 0%, #101010 100%)",
            }}
          >
            <SignUpForm />
          </CompoundModal.Content>
        </CompoundModal>
      </Flex>
    )
  );
}
