import { useParams } from "react-router";
import { useSignalR } from "../../contexts/SIgnalRContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Flex, Input, Typography } from "antd";
import {
  useChatBarFocus,
  useChatBarFocusActions,
} from "../../stores/chatBarFocusStore";
import EmojiPicker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";
import useLiveDetail from "../../hooks/useLiveDetail";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function EmojiPickerCustom({ onPickEmoji, open, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const chatBarFocus = useChatBarFocus();

  function handleEmojiClick(code) {
    const { emoji } = code;
    typeof onPickEmoji === "function" && onPickEmoji(emoji);
  }

  function handleTrigger() {
    setIsOpen((state) => {
      typeof onChange === "function" && onChange(!state);
      return !state;
    });
  }

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (chatBarFocus) return setIsOpen(false);
  }, [chatBarFocus]);

  return (
    <>
      <Button
        type="text"
        className="text-xl !text-[var(--color-brand-primary)] focus:!text-[var(--color-brand-primary)]"
        icon={<FaRegSmile />}
        onClick={handleTrigger}
      />
      <EmojiPicker
        className="!absolute bottom-[10%] right-[10%]"
        width={250}
        reactionsDefaultOpen={false}
        open={isOpen}
        onEmojiClick={handleEmojiClick}
      />
    </>
  );
}

export default function ChatBar() {
  const { id } = useParams();
  const { data: liveData } = useLiveDetail(id);
  const liveDetailData = liveData?.data?.data;

  const [showForceLogin, setShowForceLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [isSendCode, setIsSendCode] = useState(false);
  const [isEmoOpen, setIsEmoOpen] = useState(false);
  const [allowChat, setAllowChat] = useState(false);

  const {
    connectionStatus,
    sendChatMessage,
    joinGroup,
    leaveGroup,
    sendCode,
    setLiveMessages,
    currentHubConnection,
    manualReconnect,
  } = useSignalR();
  const { isAuthenticated } = useAuth();
  const { focus, blur } = useChatBarFocusActions();

  const toggleSendCode = useCallback(() => {
    setIsSendCode(!isSendCode);
  }, [isSendCode]);

  const handleSendMessage = useCallback(() => {
    if (!allowChat) {
      toast.error("Chưa đến thời gian để chat");
      return;
    }

    if (message !== "") {
      const newMsg = message.replace(/\n/g, "<br/>").trim();
      if (!isSendCode) {
        sendChatMessage({ hub: id, message: newMsg });
        setMessage("");
      } else {
        sendCode({ hub: id, message: newMsg });
        setMessage("");
        toggleSendCode();
      }
      setIsEmoOpen(false);
    }
  }, [
    message,
    sendChatMessage,
    sendCode,
    id,
    toggleSendCode,
    isSendCode,
    allowChat,
  ]);

  const handlePickEmoji = useCallback((emo) => {
    setMessage((prev) => prev + emo);
  }, []);

  useEffect(() => {
    if (!connectionStatus) {
      leaveGroup({ hub: id });
    }

    if (connectionStatus) {
      joinGroup({ hub: id });
    }

    return () => {
      leaveGroup({ hub: id });
    };
  }, [id, joinGroup, leaveGroup, connectionStatus, setLiveMessages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!currentHubConnection.current) {
        manualReconnect();
      }
    }, 5000);

    if (currentHubConnection.current) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [manualReconnect, currentHubConnection]);

  useEffect(() => {
    if (!liveDetailData) return;

    const interval = setInterval(() => {
      if (
        !liveDetailData?.isStreaming &&
        liveDetailData?.scheduleTime &&
        dayjs().isAfter(
          dayjs(liveDetailData.scheduleTime).subtract(10, "minute")
        )
      ) {
        setAllowChat(true);
      }
    }, 1000);

    if (!liveDetailData?.isLastLockChat) {
      clearInterval(interval);
      setAllowChat(true);
    } else {
      setAllowChat(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [liveDetailData, allowChat]);

  const ChatBarMemmoized = useMemo(() => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        onMouseEnter={() => !isAuthenticated && setShowForceLogin(true)}
        onMouseLeave={() => setShowForceLogin(false)}
      >
        {!showForceLogin ? (
          <div className="flex gap-2 items-center ">
            <Input
              onFocus={focus}
              onBlur={blur}
              autoSize
              maxLength={100}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                allowChat
                  ? "Nói chuyện với streamer"
                  : "Bạn chưa thể chat lúc này"
              }
              className={`flex-1  
                focus:border-[var(--color-brand-primary)] 
                focus-within:border-[var(--color-brand-primary)] 
                hover:border-[var(--color-brand-primary)] 
                focus:shadow-none
                px-3 py-1.5 
                text-white
                placeholder-gray-400
                `}
              classNames={{
                textarea: "placeholder-gray-200 ",
              }}
              disabled={!allowChat}
            />

            <div className="flex items-center gap-2 ">
              <EmojiPickerCustom
                onPickEmoji={handlePickEmoji}
                open={isEmoOpen}
                onChange={setIsEmoOpen}
              />

              <button
                type="submit"
                className="text-[var(--color-brand-primary)]"
              >
                <IoSendSharp size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full py-2">
            <Flex vertical justify="center" align="center" gap={4}>
              <Typography.Title level={5} className="!text-white">
                Nhớ 8 với những người xem chung nhé!
              </Typography.Title>
              <Typography.Text>
                Đăng nhập để tham gia trò chuyện!
              </Typography.Text>
              <button
                type="button"
                className="text-white bg-[var(--color-brand-primary)] w-full p-2 rounded-lg mt-3"
                onClick={() => document.getElementById("login-button")?.click()}
              >
                Đăng nhập
              </button>
            </Flex>
          </div>
        )}
      </form>
    );
  }, [
    handleSendMessage,
    isAuthenticated,
    message,
    showForceLogin,
    focus,
    blur,
    handlePickEmoji,
    isEmoOpen,
    allowChat,
  ]);

  return ChatBarMemmoized;
}
