import { Button, Col, Flex, Form, Image, Input, Row } from "antd";
import Logo from "./Logo";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PhoneInputField from "./PhoneInputField";
import { useModal } from "./CompoundModal";
import useRecaptcha from "../hooks/useRecaptcha";
import FormLoginAndSignup from "../assets/form-login-signup.jpg";
import FukadaSignatureBlack from "../assets/fukada-signature-black.png";
import DegeaSignatureBlack from "../assets/degea-signature-black.png";
import LoginSignupFormBG from "../assets/bg-form-login-signup.png";
import LoginSignupFormBtn from "../assets/login-signup-form-button.png";

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
    <div
      className="rounded-2xl"
      style={{ backgroundImage: `url('${LoginSignupFormBG}')` }}
    >
      <Flex className="rounded-2xl">
        <div className="w-[40%] xl:block hidden">
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
          className="xl:w-[60%] w-full pt-4"
        >
          <div className="xl:w-[70%] w-[90%]">
            <div className="flex flex-col justify-center items-center mb-8">
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
                    label={
                      <span className="text-[var(--color-brand-primary)] font-semibold">
                        Tên hiển thị
                      </span>
                    }
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
                      className="h-12 bg-white/10 border border-gray-600 rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-[var(--color-brand-primary)] font-semibold">
                        Tên tài khoản
                      </span>
                    }
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
                      className="h-12 bg-white/10 border border-gray-600 rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-[var(--color-brand-primary)] font-semibold">
                        Địa chỉ email
                      </span>
                    }
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email!" },
                      { type: "email", message: "Email không hợp lệ!" },
                    ]}
                  >
                    <Input
                      placeholder="Vui lòng nhập địa chỉ email"
                      className="h-12 bg-white/10 border border-gray-600 rounded-lg"
                    />
                  </Form.Item>
                </Col>
                <Col span={12} xs={24} md={12} className="md:pl-2">
                  <Form.Item
                    label={
                      <span className="text-[var(--color-brand-primary)] font-semibold">
                        Mật khẩu
                      </span>
                    }
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
                      className="h-12 bg-white/10 border border-gray-600 rounded-lg signup-password-field"
                      iconRender={(visible) =>
                        visible ? <FaRegEye /> : <FaRegEyeSlash />
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-[var(--color-brand-primary)] font-semibold">
                        Xác nhận mật khẩu
                      </span>
                    }
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
                          return Promise.reject(
                            new Error("Mật khẩu không khớp!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Vui lòng nhập lại mật khẩu"
                      className="h-12 bg-white/10 border border-gray-600 rounded-lg signup-password-field"
                      iconRender={(visible) =>
                        visible ? <FaRegEye /> : <FaRegEyeSlash />
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-[var(--color-brand-primary)] font-semibold">
                        Số điện thoại
                      </span>
                    }
                    required={true}
                    name="phone"
                  >
                    <PhoneInputField
                      onChange={(value) => {
                        phoneNumberRef.current = value;
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Flex justify="center">
                    <Form.Item
                      label={
                        <span className="text-[var(--color-brand-primary)] font-semibold">
                          Mã xác minh
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
                        placeholder="Nhập mã captcha"
                        className="h-12 bg-white/10 border border-gray-600 rounded-lg"
                        suffix={
                          <Image
                            src={recaptcha}
                            preview={false}
                            loading="lazy"
                          />
                        }
                        disabled={isLoading}
                      />
                    </Form.Item>
                  </Flex>
                </Col>
              </Row>

              <Form.Item>
                <Flex justify="center">
                  <button
                    type="submit"
                    className="text-white uppercase bg-cover bg-center bg-no-repeat text-xl w-[199px] h-[62px]"
                    style={{ backgroundImage: `url(${LoginSignupFormBtn})` }}
                  >
                    Đăng ký ngay
                  </button>
                </Flex>
              </Form.Item>

              <div className="text-center text-lg text-black">
                <span className="mr-2">Bạn đã có tài khoản?</span>
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
        </Flex>
      </Flex>
    </div>
  );
}
