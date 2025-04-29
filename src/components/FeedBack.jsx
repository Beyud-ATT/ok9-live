import { Flex, Form, Input, Select, Upload } from "antd";
import { FaCamera } from "react-icons/fa";
import {
  Feedback1,
  Feedback2,
  Feedback3,
  Feedback4,
  Feedback5,
} from "../utils/svg";
import useUserFeedback from "../hooks/useUserFeedback";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FEEDBACK_TYPE } from "../utils/constant";

const inputStyle =
  "bg-[#5D667E] rounded-lg border-none text-white placeholder:text-white placeholder:font-semibold hover:bg-[#5D667E] focus:bg-[#5D667E] focus-within:!bg-[#5D667E]";

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
    <Form
      form={form}
      id="feedback-form"
      className="w-full mx-auto"
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item name="commentType">
        <Select
          id="feedback-select"
          options={Object.values(FEEDBACK_TYPE).map((item) => ({
            value: item.value,
            label: item.label,
          }))}
          placeholder="Loại phản hồi"
        />
      </Form.Item>
      <Form.Item
        name="comment"
        rules={[{ required: true, message: "Hãy điền nội dung phản hồi" }]}
      >
        <Input.TextArea
          autoSize={{ minRows: 6, maxRows: 6 }}
          placeholder="Nội dung phản hồi*"
          className={inputStyle}
        />
      </Form.Item>

      <Form.Item>
        <p className="text-white font-semibold text-center">
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
          >
            <Flex
              justify="center"
              align="center"
              className="hover:text-[var(--color-brand-primary)] gap-2"
            >
              <FaCamera className="!text-lg text-[var(--color-brand-primary)] w-full h-full" />
              <span className="text-lg text-white">Thêm</span>
            </Flex>
          </Upload>
        </Form.Item>
        <Form.Item>
          <button
            type="primary"
            className={`uppercase ${
              isAuthenticated ? "bg-[#FF9400]" : "bg-gray-400"
            } w-full rounded-lg py-3 text-white text-lg font-bold cursor-pointer`}
            disabled={!isAuthenticated}
          >
            gửi phản hồi
          </button>
        </Form.Item>
      </Flex>
    </Form>
  );
}
