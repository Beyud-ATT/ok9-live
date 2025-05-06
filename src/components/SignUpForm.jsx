import { Flex, Form, Image, Input } from "antd";
import Logo from "./Logo";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa6";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PhoneInputField from "./PhoneInputField";
import { useModal } from "./CompoundModal";
import useRecaptcha from "../hooks/useRecaptcha";
import { TbLockQuestion } from "react-icons/tb";
import { AiOutlineFileProtect } from "react-icons/ai";

export default function SignUpForm() {
  const phoneNumberRef = useRef(null);
  const { signup } = useAuth();
  const { closeModal } = useModal();
  const [form] = Form.useForm();
  const { mutate: generateCaptcha, isLoading } = useRecaptcha();

  const [recaptcha, setRecaptcha] = useState("");

  const onFinish = async (values) => {
    try {
      await signup({
        ...values,
        username: values.username.trim().toLowerCase(),
      });
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
    <>
      <div
        style={{
          borderRadius: "23.645px",
          border: "15.764px solid #DFFFE6",
          background: "#D9D9D9",
        }}
      >
        <Flex vertical justify="center" align="center" className="w-full pt-4">
          <div className="w-[90%]">
            <div className="flex flex-col justify-center items-center mb-8">
              <Logo width={211} height={84} forcePC />
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
              <Form.Item
                name="displayName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên hiển thị!",
                  },
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
                  placeholder="Vui lòng nhập tên hiển thị"
                  className="h-12 bg-white/10 border border-gray-600 rounded-lg focus-within:shadow-none"
                  prefix={<MdDriveFileRenameOutline />}
                />
              </Form.Item>

              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên tài khoản!",
                  },
                  {
                    min: 6,
                    message: "Tên tài khoản phải dài hơn 6 kí tự!",
                  },
                  {
                    max: 20,
                    message: "Ten tài khoản phải dài hơn 20 kí tự!",
                  },
                ]}
              >
                <Input
                  autoComplete="new-username"
                  placeholder="Vui lòng nhập tên tài khoản"
                  className="h-12 bg-white/10 border border-gray-600 rounded-lg focus-within:shadow-none"
                  prefix={<FaRegUser />}
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
                  placeholder="Vui lòng nhập địa chỉ email"
                  className="h-12 bg-white/10 border border-gray-600 rounded-lg focus-within:shadow-none"
                  prefix={<MdOutlineEmail />}
                />
              </Form.Item>

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
                  placeholder="Vui lòng nhập mật khẩu"
                  className="h-12 bg-white/10 border border-gray-600 rounded-lg signup-password-field focus-within:shadow-none"
                  iconRender={(visible) =>
                    visible ? <FaRegEye /> : <FaRegEyeSlash />
                  }
                  prefix={<TbLockQuestion />}
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu!",
                  },
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
                  placeholder="Vui lòng nhập lại mật khẩu"
                  className="h-12 bg-white/10 border border-gray-600 rounded-lg signup-password-field focus-within:shadow-none"
                  iconRender={(visible) =>
                    visible ? <FaRegEye /> : <FaRegEyeSlash />
                  }
                  prefix={<TbLockQuestion />}
                />
              </Form.Item>

              <Form.Item required={true} name="phone">
                <PhoneInputField
                  onChange={(value) => {
                    phoneNumberRef.current = value;
                  }}
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
                  className="h-12 bg-white/10 border border-gray-600 rounded-lg focus-within:shadow-none"
                  suffix={
                    <Image src={recaptcha} preview={false} loading="lazy" />
                  }
                  disabled={isLoading}
                  prefix={<AiOutlineFileProtect />}
                />
              </Form.Item>

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
                    Đăng ký
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
                  ĐĂNG NHẬP NGAY
                </button>
              </div>
            </Form>
          </div>
        </Flex>
      </div>
    </>
  );
}
