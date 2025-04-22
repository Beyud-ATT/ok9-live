import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import Logo from "./Logo";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PhoneInputField from "./PhoneInputField";
import { useModal } from "./CompoundModal";
import useRecaptcha from "../hooks/useRecaptcha";
import { GoogleAuthProvider } from "../contexts/GoogleAuthContext";

export default function SignUpForm() {
  const phoneNumberRef = useRef(null);
  const { signup } = useAuth();
  const { closeModal } = useModal();
  const [form] = Form.useForm();
  const { mutate: generateCaptcha, isLoading } = useRecaptcha();

  const [recaptcha, setRecaptcha] = useState("");

  const onFinish = async (values) => {
    try {
      await signup(values);
      closeModal();
      form.resetFields();
    } catch (error) {
      console.error("Error in signup:", error);
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
    <div className="py-3 md:px-3 px-1">
      <div className="flex flex-col justify-center items-center mb-8">
        <Logo width={220} height={100} />
        <Typography className="text-xl font-bold !text-[#FEAC00] uppercase mt-2">
          nơi cảm xúc không giới hạn
        </Typography>
      </div>

      <Form
        form={form}
        id="signup-form"
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="w-full"
        autoComplete="off"
      >
        <Row>
          <Col span={12} xs={24} md={12} className="md:pr-2">
            <Form.Item
              name="displayName"
              rules={[
                { required: true, message: "Vui lòng nhập tên hiển thị!" },
                {
                  validator: (_, value) => {
                    const explode = value.split(" ").length;
                    if (value.trim().length < 6) {
                      return Promise.reject(
                        "Tên hiển thị phải dài hơn 6 kí tự!"
                      );
                    } else if (explode > 2) {
                      return Promise.reject(
                        "Tên hiển thị chỉ được chứa chữ cái (bao gồm cả dấu) và khoảng trắng."
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input
                placeholder="Tên hiển thị"
                className="h-12 bg-white/10 border border-gray-600 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản!" },
                { min: 6, message: "Tên tài khoản phải dài hơn 6 kí tự!" },
                { max: 20, message: "Ten tài khoản phải dài hơn 20 kí tự!" },
              ]}
            >
              <Input
                autoComplete="new-username"
                placeholder="Tên tài khoản"
                className="h-12 bg-white/10 border border-gray-600 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                placeholder="Email"
                className="h-12 bg-white/10 border border-gray-600 rounded-lg"
              />
            </Form.Item>
          </Col>
          <Col span={12} xs={24} md={12} className="md:pl-2">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                {
                  validator: (_, value) => {
                    const uppercaseRegex = new RegExp("^(?=.*[A-Z])");
                    const numberRegex = new RegExp("^(?=.*[0-9])");
                    if (
                      !uppercaseRegex.test(value) ||
                      !numberRegex.test(value)
                    ) {
                      return Promise.reject(
                        "Mật khẩu phải chứa ít nhất một chữ in hoa và một số!"
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input.Password
                autoComplete="new-password"
                placeholder="Mật khẩu"
                className="h-12 bg-white/10 border border-gray-600 rounded-lg signup-password-field"
                iconRender={(visible) =>
                  visible ? <FaRegEye /> : <FaRegEyeSlash />
                }
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Xác nhận mật khẩu"
                className="h-12 bg-white/10 border border-gray-600 rounded-lg signup-password-field"
                iconRender={(visible) =>
                  visible ? <FaRegEye /> : <FaRegEyeSlash />
                }
              />
            </Form.Item>

            <Form.Item name="phone">
              <PhoneInputField
                onChange={(value) => {
                  phoneNumberRef.current = value;
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
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
                suffix={
                  <Image src={recaptcha} preview={false} loading="lazy" />
                }
                disabled={isLoading}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 bg-[var(--color-brand-primary)] hover:!bg-orange-600 border-none rounded-lg text-lg font-medium"
          >
            Đăng ký
          </Button>
        </Form.Item>

        <div className="text-center text-gray-300">
          Bạn đã có tài khoản?{" "}
          <span
            href="#"
            className="text-[var(--color-brand-primary)] hover:text-orange-400 cursor-pointer"
            onClick={() => {
              document.getElementById("login-button")?.click();
              closeModal();
            }}
          >
            Đăng nhập ngay
          </span>
        </div>
      </Form>
    </div>
  );
}
