import { Button, Form, DatePicker } from "antd";
import useCheckChat from "../../hooks/useCheckChat";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { useState } from "react";
import { chatHeightSetting } from "../../utils/constant";

export default function ChatFilter() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [chats, setChats] = useState([]);

  const { mutate: checkChat, isLoading: isChecking } = useCheckChat();

  const handleCheckChat = (values) => {
    const params = {
      ...values,
      startAt: dayjs(values.startAt).toISOString(),
      endAt: dayjs(values.endAt).toISOString(),
      chatFilter: "Message",
      group: id,
    };
    checkChat(params, {
      onSuccess: (data) => {
        if (data.status === 200) {
          setChats(data?.data?.data);
        }
      },
    });
  };

  return (
    <div
      className={`${chatHeightSetting} overflow-auto bg-[var(--lighter-background)] h-[57dvh]`}
    >
      <Form
        form={form}
        className="flex flex-col justify-center py-4 px-4 sticky top-0 bg-[var(--table-border-color)]"
        onFinish={handleCheckChat}
      >
        <div className="flex w-full justify-center items-center gap-2">
          <Form.Item name="startAt">
            <DatePicker
              placeholder="Từ"
              defaultValue={dayjs()}
              showTime
              size="small"
            />
          </Form.Item>
          <Form.Item name="endAt">
            <DatePicker
              placement="bottomRight"
              placeholder="Đến"
              defaultValue={dayjs()}
              showTime
              size="small"
            />
          </Form.Item>
        </div>
        <Form.Item className="flex justify-end !m-0">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[var(--color-brand-primary)] hover:bg-orange-600 disabled:bg-[var(--color-brand-primary)] text-white"
            disabled={isChecking}
          >
            Kiểm tra
          </Button>
        </Form.Item>
      </Form>
      <div className="flex flex-col gap-2 my-3 text-white px-4">
        {chats.map((chat, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-2 mb-3 text-white w-full overflow-hidden"
            >
              <p className="flex flex-wrap justify-between px-2 break-all">
                <span>
                  <span className="text-[var(--color-brand-primary)]">
                    Nội dung:
                  </span>{" "}
                  {chat.hiddenMessage}
                </span>
                <span className="text-[10px] align-bottom pt-2 text-gray-400">
                  {dayjs(chat.createdAt).format("HH:mm")}
                </span>
              </p>
              <div className="h-[1px] bg-gradient-to-r from-[#FFEE30] via-[#FF9900] to-[#5C3A06]"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
