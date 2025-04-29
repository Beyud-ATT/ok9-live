import { Flex, Form, Image, Input, Select, Typography, Upload } from "antd";
import { FaCamera } from "react-icons/fa";
import useUserFeedback from "../hooks/useUserFeedback";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FEEDBACK_TYPE } from "../utils/constant";
import Left from "../assets/left.webp";
import Right from "../assets/right.webp";
import Feedback from "../assets/feedback.png";
import FeedbackIcon from "../assets/feedback-icon.png";

const inputStyle =
  "rounded-lg border-none text-black placeholder:text-[#B9C0CF] placeholder:font-semibold";

export default function FeedBack() {
  const { isAuthenticated } = useAuth();
  const [form] = Form.useForm();
  const [commentFile, setCommentFile] = useState();
  const [fileList, setFileList] = useState([]);
  const [uploadKey, setUploadKey] = useState(0);

  const { mutate: feedBack } = useUserFeedback();

  function handleFinish(values) {
    if (!isAuthenticated) {
      toast.error("Đăng nhập để gửi phản hồi!");
      return;
    }

    feedBack(
      { ...values, commentFile },
      {
        onSuccess: () => {
          form.resetFields();
          setCommentFile(undefined);
          setFileList([]);
          setUploadKey((prev) => prev + 1);
        },
      }
    );
  }

  const handleUploadChange = ({ fileList: newFileList }) => {
    // Only keep the last file if multiple files are uploaded
    const latestFileList = newFileList.slice(-1);
    setFileList(latestFileList);

    // Set the actual file object for upload
    if (latestFileList.length > 0) {
      setCommentFile(latestFileList[0].originFileObj);
    } else {
      setCommentFile(undefined);
    }
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        className="lg:mb-7 md:mb-5 mb-3"
      >
        <Image
          src={Left}
          alt="left"
          preview={false}
          className="lg:block hidden"
        />
        <Typography.Title
          level={3}
          className="lg:!text-4xl md:!text-2xl !font-bold font-utmBold !mb-0 uppercase"
          style={{
            background:
              "linear-gradient(180deg, #359EFF 48.35%, #1F79FF 81.94%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          phản hồi khách hàng
        </Typography.Title>
        <Image
          src={Right}
          alt="right"
          preview={false}
          className="lg:block hidden"
        />
      </Flex>

      <Flex align="center" className="mb-6">
        <div className="lg:w-[50%] lg:block hidden">
          <Image
            src={Feedback}
            alt="Feedback"
            preview={false}
            className="lg:block hidden"
          />
        </div>
        <div
          className="lg:w-[50%] w-full p-5"
          style={{
            borderRadius: "20.126px",
            border: "1.677px solid #FFF",
            background: "#F5F9FF",
            boxShadow:
              "0px 3.354px 9.56px 9.224px rgba(49, 73, 133, 0.02), 0px 0px 7.212px 6.709px rgba(164, 190, 255, 0.25) inset",
          }}
        >
          <Form
            form={form}
            id="feedback-form"
            className="w-full mx-auto"
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item
              name="commentType"
              label={
                <span className="text-[var(--color-brand-primary)] font-medium text-[20px]">
                  Loại phản hồi
                </span>
              }
            >
              <Select
                options={Object.values(FEEDBACK_TYPE).map((item) => ({
                  value: item.value,
                  label: item.label,
                }))}
                placeholder="Phản hồi về sản phẩm quà tặng"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-[var(--color-brand-primary)] font-medium text-[20px]">
                  Nội dung phản hồi
                </span>
              }
              name="comment"
            >
              <Input.TextArea
                autoSize={{ minRows: 6, maxRows: 6 }}
                placeholder="Bất kì ý kiến nào của bạn cũng đều rất quan trọng đối với chúng tôi"
                className={inputStyle}
                style={{
                  borderRadius: "12px",
                  border: "0.5px solid var(--main, #359EFF)",
                  background: "#FFF",
                  boxShadow:
                    "0px 0px 14.4px 5px rgba(53, 158, 255, 0.08) inset, 2px 2px 4px 0px rgba(53, 158, 255, 0.30)",
                }}
              />
            </Form.Item>

            <Form.Item>
              <p className="text-[var(--color-brand-primary)] font-semibold text-[20px]">
                Hình ảnh không biết nói dối (Dễ dàng được thông qua)
              </p>
            </Form.Item>

            <Flex vertical className="max-w-[1200px] mx-auto">
              <Form.Item>
                <Upload
                  key={uploadKey}
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                  showUploadList={{ showPreviewIcon: false }}
                  fileList={fileList}
                  onChange={handleUploadChange}
                  name="commentFile"
                  className="w-[145px] "
                >
                  <Flex
                    vertical
                    justify="center"
                    align="center"
                    className="hover:text-[var(--color-brand-primary)] gap-1"
                  >
                    <Image src={FeedbackIcon} preview={false} />
                    <span className="text-[10px] text-[#586683]">
                      Hỗ trợ tải hình ảnh (kích thước không quá 3MB)
                    </span>
                  </Flex>
                </Upload>
              </Form.Item>
              <Form.Item>
                <button
                  type="primary"
                  className={`cursor-pointer w-full text-[20px] py-4 font-medium capitalize text-white`}
                  style={{
                    borderRadius: "12px",
                    background:
                      "radial-gradient(107.08% 85.59% at 86.3% 87.5%, rgba(0, 0, 0, 0.23) 0%, rgba(0, 0, 0, 0.00) 86.18%), radial-gradient(83.94% 83.94% at 26.39% 20.83%, rgba(255, 255, 255, 0.41) 0%, rgba(255, 255, 255, 0.00) 69.79%, rgba(255, 255, 255, 0.00) 100%), #359EFF",
                    boxShadow:
                      "-3px -4px 7px 0px rgba(255, 255, 255, 0.15) inset",
                  }}
                >
                  gửi phản hồi
                </button>
              </Form.Item>
            </Flex>
          </Form>
        </div>
      </Flex>
    </>
  );
}
