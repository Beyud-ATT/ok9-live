import { Flex, Form, Image, Input } from "antd";
import Logo from "./Logo";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthContext";
import useRecaptcha from "../hooks/useRecaptcha";
import { useModal } from "./CompoundModal";
// import ForgotPassword from "./ForgotPassword";
import { useEffect, useState } from "react";
import FormLoginAndSignup from "../assets/form-login-signup.jpg";
import FukadaSignatureBlack from "../assets/fukada-signature-black.png";
import DegeaSignatureBlack from "../assets/degea-signature-black.png";
import LoginSignupFormBG from "../assets/bg-form-login-signup.png";
import LoginSignupFormBtn from "../assets/login-signup-form-button.png";

export default function LoginForm() {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const { closeModal } = useModal();
  const { mutateAsync: generateCaptcha, isLoading } = useRecaptcha();

  const [recaptcha, setRecaptcha] = useState("");

  const onFinish = async (values) => {
    try {
      const res = await login(values);
      if (res?.status === 200) {
        closeModal();
      }
      form.resetFields();
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  useEffect(() => {
    generateCaptcha("", {
      onSuccess: (data) => {
        setRecaptcha(data?.data?.data);
      },
    });
  }, [generateCaptcha]);

  return (
    <div
      className={`rounded-2xl w-full`}
      style={{ backgroundImage: `url('${LoginSignupFormBG}')` }}
    >
      <Flex>
        <div className="lg:block hidden w-[40%]">
          <Image
            src={FormLoginAndSignup}
            preview={false}
            className="rounded-l-2xl translate-y-1 translate-x-0.5"
          />
        </div>
        <Flex
          vertical
          justify="center"
          align="center"
          className="lg:w-[60%] w-full pt-4"
        >
          <div className="lg:w-[70%] w-[90%]">
            <div className="flex flex-col justify-center items-center mb-3">
              <Logo width={220} height={100} />
            </div>
            <div className="mb-5">
              <p className="text-black font-bold text-2xl">
                Đại sứ thương hiệu
              </p>
              <Flex vertical>
                <Flex justify="space-between" align="center">
                  <p className="text-black capitalize text-lg">
                    david de gea (2024 - 2025)
                  </p>
                  <Image src={DegeaSignatureBlack} preview={false} />
                </Flex>
                <Flex justify="space-between" align="center">
                  <p className="text-black capitalize text-lg">
                    eimi fukada (2024 - 2025)
                  </p>
                  <Image src={FukadaSignatureBlack} preview={false} />
                </Flex>
              </Flex>
            </div>
            <Form
              form={form}
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
              className="w-full"
              autoComplete="off"
            >
              <Form.Item
                label={
                  <span className="text-[var(--color-brand-primary)] font-semibold">
                    Tên tài khoản
                  </span>
                }
                name="username"
                rules={[{ required: true, message: "Hãy nhập tên tài khoản!" }]}
              >
                <Input
                  autoComplete="new-username"
                  placeholder="Vui lòng nhập tên tài khoản"
                  className="h-12 bg-white/10 border border-gray-600 rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-[var(--color-brand-primary)] font-semibold">
                    Mật khẩu
                  </span>
                }
                name="password"
                rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
              >
                <Input.Password
                  autoComplete="new-password"
                  placeholder="Vui lòng nhập mật khẩu"
                  className="h-12 bg-white/10 border border-gray-600 rounded-lg login-form-password"
                  iconRender={(visible) =>
                    visible ? <FaRegEye /> : <FaRegEyeSlash />
                  }
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-[var(--color-brand-primary)] font-semibold">
                    Mã Xác Minh
                  </span>
                }
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "Nhập mã captcha!",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Vui lòng nhập mã xác minh"
                  className="h-12 bg-white/10 border border-gray-600 rounded-lg"
                  suffix={<Image src={recaptcha} preview={false} />}
                  disabled={isLoading}
                />
              </Form.Item>

              <Form.Item className="mb-2">
                <div className="flex justify-end items-center">
                  {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-300">Lưu mật khẩu</Checkbox>
            </Form.Item> */}
                  {/* <ForgotPassword /> */}
                </div>
              </Form.Item>

              <Form.Item>
                <Flex justify="center">
                  <button
                    type="submit"
                    className="text-white uppercase bg-cover bg-center bg-no-repeat text-xl w-[199px] h-[62px]"
                    style={{ backgroundImage: `url(${LoginSignupFormBtn})` }}
                  >
                    Đăng nhập
                  </button>
                </Flex>
              </Form.Item>

              <div className="text-center text-black text-lg">
                <span className="mr-2">BẠN ĐÃ CHƯA CÓ TÀI KHOẢN?</span>
                <span
                  href="#"
                  className="text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] cursor-pointer"
                  onClick={() => {
                    document.getElementById("signup-button")?.click();
                    closeModal();
                  }}
                >
                  Đăng ký
                </span>
              </div>
            </Form>
            <Flex gap={24} className="my-4">
              <Flex
                justify="center"
                align="center"
                className="bg-[#AAD1FF] rounded-lg text-[#0053DF] lg:text-lg text-[12px] lg:px-4 lg:py-2 px-2 py-1"
              >
                <span className="w-[80%]">
                  LẤY LẠI MẬT KHẨU QUA SỐ ĐIỆN THOẠI
                </span>
              </Flex>
              <Flex
                justify="center"
                align="center"
                className="bg-[#AAD1FF] rounded-lg text-[#0053DF] lg:text-lg text-[12px] lg:px-4 lg:py-2 px-2 py-1"
              >
                <span className="w-[80%]">
                  LẤY LẠI MẬT KHẨU QUA ĐỊA CHỈ EMAIL
                </span>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
