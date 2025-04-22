import { Flex, Form, Input } from "antd";
import { useState } from "react";
import { EmptyStar, FilledStar } from "../../../utils/svg";
import useUserPresentRate from "../../../hooks/useUserPresentRate";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function RatingForm() {
  const [form] = Form.useForm();
  const [star, setStar] = useState(0);
  const { isAuthenticated } = useAuth();
  const { mutate: presentRate } = useUserPresentRate();

  function handleFinish(values) {
    if (!isAuthenticated) {
      toast.error("Đăng nhập để đánh giá quà tặng!");
      return;
    }

    presentRate(
      { ...values, rate: star },
      {
        onSuccess: () => {
          form.resetFields();
          setStar(0);
        },
      }
    );
  }

  return (
    <Form form={form} className="w-full mb-10" onFinish={handleFinish}>
      <Form.Item name="comment">
        <Input.TextArea
          placeholder="Comment"
          autoSize={{ minRows: 6, maxRows: 6 }}
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={20}>
            <Flex justify="center" align="center" gap={20}>
              <p className="text-white text-lg">Chất lượng</p>
              <Flex gap={5}>
                {Array.from({ length: 6 }).map((_, index) =>
                  index === 0 ? null : index <= star ? (
                    <div key={index} onClick={() => setStar(index)}>
                      <FilledStar
                        key={index}
                        className="lg:w-[34px] lg:h-[46px] w-[27px] h-[29px]"
                      />
                    </div>
                  ) : (
                    <div key={index} onClick={() => setStar(index)}>
                      <EmptyStar
                        key={index}
                        className="lg:w-[34px] lg:h-[46px] w-[27px] h-[29px]"
                      />
                    </div>
                  )
                )}
              </Flex>
            </Flex>
          </Flex>
          <Flex justify="center" align="center">
            <button
              type="submit"
              className={`text-2xl text-white font-semibold px-16 py-2 ${
                isAuthenticated
                  ? "bg-gradient-to-r from-[#FF9400] to-[#FF3A46]"
                  : "bg-gray-400"
              }`}
              style={{
                borderRadius: "44px",
              }}
              disabled={!isAuthenticated}
            >
              Gửi
            </button>
          </Flex>
        </Flex>
      </Form.Item>
    </Form>
  );
}
