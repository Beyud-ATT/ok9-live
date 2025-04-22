import { Button, Checkbox, Flex, Form, Image, Input, Typography } from "antd";
import Logo from "./Logo";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthContext";
import useRecaptcha from "../hooks/useRecaptcha";
import { GoogleAuthProvider } from "../contexts/GoogleAuthContext";
import { useModal } from "./CompoundModal";
import ForgotPassword from "./ForgotPassword";
import { useEffect, useState } from "react";

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
    <div className="rounded-2xl py-3 md:px-3 px-1 w-full">
      <div className="flex flex-col justify-center items-center mb-8">
        <Logo width={220} height={100} />
        <Typography className="text-xl font-bold !text-[#FEAC00] uppercase mt-2">
          nơi cảm xúc không giới hạn
        </Typography>
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
            placeholder="Nhập tài khoản"
            className="h-12 bg-white/10 border border-gray-600 rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
        >
          <Input.Password
            autoComplete="new-password"
            placeholder="Nhập mật khẩu"
            className="h-12 bg-white/10 border border-gray-600 rounded-lg login-form-password"
            iconRender={(visible) =>
              visible ? <FaRegEye /> : <FaRegEyeSlash />
            }
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
            placeholder="Nhập mã captcha"
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
            <ForgotPassword />
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 bg-[var(--color-brand-primary)] hover:!bg-orange-600 border-none rounded-lg text-lg font-medium"
          >
            Đăng nhập
          </Button>
        </Form.Item>

        <div className="text-center text-gray-300">
          Bạn chưa có tài khoản?{" "}
          <span
            href="#"
            className="text-[var(--color-brand-primary)] hover:text-orange-400 cursor-pointer"
            onClick={() => {
              document.getElementById("signup-button")?.click();
              closeModal();
            }}
          >
            Đăng ký ngay
          </span>
        </div>
      </Form>
      <Flex gap={8} justify="center" items="center" className="w-full my-6">
        <div className="w-full h-[0.5px] my-2 bg-gray-600"></div>
        <p className="px-2 text-center text-gray-300">hoặc</p>
        <div className="w-full h-[0.5px] my-2 bg-gray-600"></div>
      </Flex>
      <Flex className="w-full" justify="center">
        <GoogleAuthProvider.GoogleLoginButton />
      </Flex>
    </div>
  );
}
