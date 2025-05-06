import { Flex, Form, Image, Input } from "antd";
import Logo from "./Logo";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa6";
import { TbLockQuestion } from "react-icons/tb";
import { useAuth } from "../contexts/AuthContext";
import useRecaptcha from "../hooks/useRecaptcha";
import { useModal } from "./CompoundModal";
// import ForgotPassword from "./ForgotPassword";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const { closeModal } = useModal();
  const { mutateAsync: generateCaptcha, isLoading } = useRecaptcha();

  const [recaptcha, setRecaptcha] = useState("");

  const onFinish = async (values) => {
    try {
      const res = await login({
        ...values,
        username: values.username.trim().toLowerCase(),
      });
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
      style={{
        borderRadius: "26.305px",
        border: "16.34px solid #DFFFE6",
        background: "#D9D9D9",
      }}
    >
      <Flex vertical justify="center" align="center" className="w-full pt-4">
        <div className="w-[90%]">
          <div className="flex flex-col justify-center items-center mb-6">
            <Logo width={211} height={84} forcePC />
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
              name="username"
              rules={[{ required: true, message: "Hãy nhập tên tài khoản!" }]}
            >
              <Input
                autoComplete="new-username"
                placeholder="Tên tài khoản từ 4 - 11 ký tự, số và chữ"
                className="h-12 bg-white/10 border border-gray-600 rounded-lg focus-within:shadow-none"
                prefix={<FaRegUser />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
            >
              <Input.Password
                autoComplete="new-password"
                placeholder="Mật khẩu (6 - 16 ký tự kết hợp giữa số và chữ)"
                className="h-12 bg-white/10 border border-gray-600 rounded-lg focus-within:shadow-none"
                iconRender={(visible) =>
                  visible ? <FaRegEye /> : <FaRegEyeSlash />
                }
                prefix={<TbLockQuestion />}
              />
            </Form.Item>

            <Form.Item
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
                placeholder="Vui lòng nhập lại mật khẩu"
                className="h-12 bg-white/10 border border-gray-600 rounded-lg focus-within:shadow-none"
                suffix={<Image src={recaptcha} preview={false} />}
                disabled={isLoading}
              />
            </Form.Item>

            {/* <Form.Item className="mb-2">
              <div className="flex justify-end items-center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-300">Lưu mật khẩu</Checkbox>
            </Form.Item>
                <ForgotPassword />
              </div>
            </Form.Item> */}

            <Form.Item>
              <Flex justify="center">
                <button
                  type="submit"
                  className="w-full text-white uppercase text-xl p-3 text-[19px] font-medium"
                  style={{
                    borderRadius: "7.971px",
                    background:
                      "linear-gradient(180deg, #79CF53 0%, #46B03E 100%)",
                  }}
                >
                  Đăng nhập
                </button>
              </Flex>
            </Form.Item>

            <div className="text-center text-black text-lg">
              <button
                href="#"
                className="text-[19px] font-medium text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] cursor-pointer bg-white w-full rounded-lg p-3 mb-7"
                onClick={() => {
                  document.getElementById("signup-button")?.click();
                  closeModal();
                }}
              >
                ĐĂNG KÝ NGAY
              </button>
            </div>
          </Form>
        </div>
      </Flex>
    </div>
  );
}
