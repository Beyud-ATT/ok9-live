import { Tabs } from "antd";
import { ChatInterface } from "./Chat";
import ChatFilter from "./ChatFilter";
import { useDevice, screenType } from "../../contexts/ResponsiveContext";
import { useEffect, useState } from "react";
import ChatBar from "./ChatBar";

// Keyboard-aware chat input component
function KeyboardAwareChatBar() {
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    function handleVisualViewportChange() {
      if (window.visualViewport) {
        const offsetBottom =
          window.innerHeight -
          window.visualViewport.height -
          window.visualViewport.offsetTop;
        setBottomOffset(offsetBottom > 0 ? offsetBottom : 0);
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        "resize",
        handleVisualViewportChange
      );
      window.visualViewport.addEventListener(
        "scroll",
        handleVisualViewportChange
      );
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleVisualViewportChange
        );
        window.visualViewport.removeEventListener(
          "scroll",
          handleVisualViewportChange
        );
      }
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-30 bg-[var(--lighter-background)] px-2 py-2"
      style={{ bottom: `${bottomOffset}px` }}
    >
      <ChatBar />
    </div>
  );
}

function AdaptiveChatInterface() {
  const { deviceType } = useDevice();
  const isMobile = deviceType === screenType.MOBILE;

  if (isMobile) {
    return (
      <>
        <div className="pb-16">
          <ChatInterface hideInput={true} />
        </div>
        <KeyboardAwareChatBar />
      </>
    );
  }

  return <ChatInterface />;
}

const items = [
  {
    label: "Bình Luận",
    key: "chats",
    children: <AdaptiveChatInterface />,
  },
  {
    label: "Tin đã gửi",
    key: "filter",
    children: <ChatFilter />,
  },
];

export default function LiveTabs() {
  return <Tabs defaultActiveKey="1" type="card" items={items} />;
}
