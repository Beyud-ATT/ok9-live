import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import ChatBar from "./ChatBar";
import { useSignalR } from "../../contexts/SIgnalRContext";
import { FaBell, FaRegEyeSlash } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import useLiveDetail from "../../hooks/useLiveDetail";
import { Link, useParams } from "react-router";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import parse from "html-react-parser";
import useBannedChat from "../../hooks/useBannedChat";
import useAddBannedChat from "../../hooks/useAddBannedChat";
import moment from "moment/moment";
import useMobileKeyboardOpen from "../../hooks/useMobileKeyboardOpen";
import useScrollDirection from "../../hooks/useScrollDirection";
import useGetGeneralLinks from "../../hooks/useGetGeneralLinks";
import { chatHeightSetting } from "../../utils/constant";

function ShowMore({ message, show }) {
  const [showMore, setShowMore] = useState(false);
  const messageLength = 30;
  const messageHasBreak = String(message).includes("<br/>");
  let truncatedMessage = "";

  if (messageHasBreak) {
    truncatedMessage = String(message)
      .replaceAll("<br/>", "_")
      .split("_")
      .at(0)
      .concat("...");
  } else {
    truncatedMessage =
      String(message).length <= messageLength
        ? String(message).replaceAll("<br/>", "_")
        : String(message).slice(0, messageLength).concat("...");
  }

  return (
    <span
      className="space-x-1 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setShowMore((state) => !state);
      }}
    >
      {(show !== undefined ? show : showMore) ? (
        <span>{parse(message)}</span>
      ) : (
        <span>{truncatedMessage}</span>
      )}
    </span>
  );
}

function PinnedMessage() {
  const { id } = useParams();
  const { data } = useLiveDetail(id);
  const eventCodes = data?.data?.data?.eventCodes;
  const { newPinnedMsg, resetNewPinnedMsg } = useSignalR();
  const [messages, setMessages] = useState(eventCodes || []);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [show, setShow] = useState(false);

  const handleMessageClick = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages?.length);
    },
    [messages?.length]
  );

  useEffect(() => {
    if (eventCodes) {
      setMessages(eventCodes);
      setCurrentMessageIndex(eventCodes?.length - 1);
    }
  }, [eventCodes]);

  useEffect(() => {
    if (newPinnedMsg) {
      setMessages((prev) => [...prev, newPinnedMsg]);
      setCurrentMessageIndex((prev) => prev + 1);
    }

    resetNewPinnedMsg();
  }, [newPinnedMsg, resetNewPinnedMsg]);

  function toggleShow(e) {
    e.stopPropagation();
    setShow((state) => !state);
  }

  return (
    messages?.length > 0 && (
      <div
        className="rounded-lg mb-3 cursor-pointer bg-[var(--table-border-color)]"
        onClick={handleMessageClick}
      >
        <div className="px-4 md:py-3 py-1">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center justify-center text-[var(--color-brand-primary-lighter)] font-semibold gap-3 overflow-hidden min-w-0">
              <span className="flex-shrink-0">{currentMessageIndex + 1}. </span>
              <div className="overflow-hidden">
                <ShowMore message={messages[currentMessageIndex]} show={show} />
              </div>
            </div>
            <div>
              {show ? (
                <button type="button" className="m-1 cursor-pointer">
                  <IoMdArrowDropup
                    className="text-[var(--color-brand-primary-lighter)] text-2xl cursor-pointer"
                    onClick={toggleShow}
                  />
                </button>
              ) : (
                <button type="button" className="m-1 cursor-pointer">
                  <IoMdArrowDropdown
                    className="text-[var(--color-brand-primary-lighter)] text-2xl cursor-pointer"
                    onClick={toggleShow}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function WarningAndPinnedComment() {
  const message = `Chào mừng bạn đến với phòng phát trực tiếp của F8BET Live thiết lập
          môi trường live thân thiện và hài hòa. Mọi nội dung lạm dụng, thô tục
          hoặc bạo lực sẽ bị chặn. Hãy chú ý an toàn tài sản của bạn, không
          chuyển tiền riêng, tránh bị lừa đảo.`;

  return (
    <>
      <div className="p-2">
        <div className="text-[var(--text-color)] text-justify">
          <span className="space-x-1">
            <FaBell className="inline-block p-1 rounded-full text-xl bg-gray-400 -translate-y-0.5 text-[var(--text-color)]" />
            <span className="text-[var(--color-brand-primary)]">
              Thông tin Hệ thống:
            </span>
            <ShowMore message={message} />
          </span>
        </div>
      </div>
      <PinnedMessage />
    </>
  );
}

function ChatFrame({ ...rest }) {
  const { id } = useParams();
  const curretUserId = useMemo(() => {
    return localStorage.getItem("userId");
  }, []);

  const commentsContainerRef = useRef(null);
  const commentsEndRef = useRef(null);

  const { generalLinks } = useGetGeneralLinks();
  const { linkCode } = generalLinks?.data?.data || {};

  const {
    liveMessages: comments,
    resetLiveMessages,
    setLiveMessages,
  } = useSignalR();
  const { data: bannedChatList } = useBannedChat();
  const { mutateAsync: addBannedChat } = useAddBannedChat();
  const bannedChatIds = useMemo(() => {
    return (bannedChatList?.data?.data || []).map((item) => item.id);
  }, [bannedChatList]);

  const isMobileKeyboardOpen = useMobileKeyboardOpen();
  const { isSrcollUp } = useScrollDirection({
    element: commentsContainerRef.current,
    thresholdPixels: 10,
    throttleTime: 300,
  });

  const getMessages = useCallback(() => {
    if (comments?.length > 0) {
      if (comments?.length > 200) comments?.shift();
      return comments;
    }

    if (!localStorage.getItem(`${id}-chat`)) return [];

    const localStorageData = JSON.parse(localStorage.getItem(`${id}-chat`));
    const messages = localStorageData?.chat;

    if (moment().isAfter(localStorageData?.expiredAt)) {
      localStorage.removeItem(`${id}-chat`);
      resetLiveMessages();
      return [];
    }

    if (messages?.length > 0) {
      setLiveMessages(messages);
    }

    return messages;
  }, [comments, id, setLiveMessages, resetLiveMessages]);
  const messages = getMessages();

  const scrollToBottom = useCallback(() => {
    const container = commentsContainerRef.current;
    const bottomElement = commentsEndRef.current;

    if (container && bottomElement) {
      const containerHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;

      if (scrollHeight > containerHeight && !isSrcollUp) {
        bottomElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [isSrcollUp]);

  useEffect(() => {
    scrollToBottom();
  }, [comments, scrollToBottom]);

  useEffect(() => {
    if (comments?.length === 0) return;
    if (comments?.length > 200) comments?.shift();

    const deepCopy = comments?.slice(Math.max(comments.length - 50, 0));
    localStorage.setItem(
      `${id}-chat`,
      JSON.stringify({
        chat: deepCopy,
        expiredAt: moment().add(30, "minutes"),
      })
    );
  }, [comments, id, getMessages]);

  useEffect(() => {
    return () => {
      resetLiveMessages();
    };
  }, [resetLiveMessages]);

  return (
    <div
      className={`text-black flex flex-col p-2 ${chatHeightSetting} overflow-auto ${
        isMobileKeyboardOpen ? "h-[25dvh]" : "h-[40dvh]"
      }`}
    >
      {/* {!isMobileKeyboardOpen && (
        <>
          <Link to={linkCode} target="_blank" className="w-full">
            <Button
              variant="solid"
              className="w-full bg-[var(--color-brand-primary)] hover:!bg-orange-500 border-none cursor-pointer text-white hover:!text-gray-100 px-4 py-2 rounded-lg font-bold"
            >
              <Hono /> Nhập Code
            </Button>
          </Link>
          <WarningAndPinnedComment />
        </>
      )} */}

      <div ref={commentsContainerRef} className="overflow-y-auto">
        <div className="p-2 space-y-3">
          {messages
            ?.filter((comment) => !bannedChatIds.includes(comment?.userId))
            ?.map((comment, index) => {
              const isSpecial = comment.isSpecial;
              return (
                <div
                  key={`${comment.id}_${index}`}
                  className="flex justify-between"
                >
                  <div className="flex gap-1">
                    <div
                      className={`flex gap-0.5 text-[var(--color-brand-primary)] text-sm font-medium mb-1 ${
                        isSpecial
                          ? "text-[var(--color-brand-primary-lighter)]"
                          : ""
                      }`}
                    >
                      <span>{comment.displayName}</span>
                      {isSpecial && (
                        <FaCrown className="rotate-45 text-[10px]" />
                      )}
                      <span>:</span>
                    </div>
                    <div
                      className={`text-black text-xs leading-relaxed ${
                        isSpecial
                          ? "!text-[var(--color-brand-primary-lighter)] font-semibold"
                          : ""
                      } break-all`}
                    >
                      {parse(comment.message)}
                    </div>
                  </div>
                  <div className="text-black cursor-pointer">
                    {comment.userId !== curretUserId && !isSpecial && (
                      <FaRegEyeSlash
                        onClick={() => {
                          addBannedChat({ userId: comment?.userId });
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          <div ref={commentsEndRef} />
        </div>
      </div>
    </div>
  );
}

function BareChatFrame() {
  const { id } = useParams();

  const {
    connectionStatus,
    joinGroup,
    leaveGroup,
    manualReconnect,
    currentHubConnection,
  } = useSignalR();

  useEffect(() => {
    if (connectionStatus) {
      joinGroup({ hub: id });
    }

    return () => {
      leaveGroup({ hub: id });
    };
  }, [id, joinGroup, leaveGroup, connectionStatus, manualReconnect]);

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

  const commentsContainerRef = useRef(null);
  const commentsEndRef = useRef(null);

  const { liveMessages: comments } = useSignalR();

  const scrollToBottom = useCallback(() => {
    const container = commentsContainerRef.current;
    const bottomElement = commentsEndRef.current;

    if (container && bottomElement) {
      const containerHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;

      if (scrollHeight > containerHeight) {
        bottomElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [comments, scrollToBottom]);

  return (
    <div
      ref={commentsContainerRef}
      className="overflow-y-auto w-[500px] !bg-transparent h-[100dvh] no-scrollbar"
    >
      <div className="p-2 space-y-3">
        {comments.map((comment, index) => {
          const isSpecial = comment.isSpecial;
          return (
            <div
              key={`${comment.id}_${index}`}
              className="flex justify-between text-xl"
            >
              <div className="flex gap-1">
                <div
                  className={`flex gap-0.5 text-[var(--color-brand-primary)] font-medium mb-1 ${
                    isSpecial ? "text-[var(--color-brand-primary-lighter)]" : ""
                  }`}
                >
                  <span>{comment.displayName}</span>
                  {isSpecial && <FaCrown className="rotate-45" />}
                  <span>:</span>
                </div>
                <div
                  className={`text-black leading-relaxed ${
                    isSpecial
                      ? "!text-[var(--color-brand-primary-lighter)] font-semibold"
                      : ""
                  }`}
                >
                  {parse(comment.message)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={commentsEndRef} />
      </div>
    </div>
  );
}

function ChatInterface({ ...rest }) {
  return (
    <div
      className={`flex flex-col h-full w-full justify-between rounded-b-2xl  ${chatHeightSetting} bg-[#E8F1FF]`}
      {...rest}
    >
      <ChatFrame />
      <div className="pb-3 px-2">
        <ChatBar />
      </div>
    </div>
  );
}

export { ChatInterface, BareChatFrame };
