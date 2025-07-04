import { createContext, useContext, useState } from "react";
import LeftNav from "../../../pages/User/LeftNav";
import { Drawer, Flex } from "antd";
import UserAvatar from "../../../components/UserAvatar";
import { useAuth } from "../../../contexts/AuthContext";
import { IoClose } from "react-icons/io5";

const DrawerContext = createContext();

function DrawerProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer, setIsOpen }}>
      {isAuthenticated && children}
    </DrawerContext.Provider>
  );
}

export function useUserActionDrawer() {
  const context = useContext(DrawerContext);
  // if (!context) {
  //   throw new Error("useDrawer must be used within a DrawerProvider");
  // }
  return context;
}

function UserActionDrawerInner() {
  const { isOpen, toggleDrawer, setIsOpen } = useUserActionDrawer();

  return (
    <div className="lg:hidden block">
      <button
        className="rounded-full bg-[var(--background-color)] hover:bg-[var(--background-color)] flex items-center justify-center"
        onClick={toggleDrawer}
      >
        <UserAvatar />
      </button>
      <Drawer
        title={
          <Flex className="w-full px-4" justify="end">
            <IoClose
              className="mt-4 text-2xl"
              onClick={() => setIsOpen(false)}
            />
          </Flex>
        }
        placement={"right"}
        closable={false}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        key="left"
        className="!bg-[var(--background-color-2)]"
      >
        <LeftNav />
      </Drawer>
    </div>
  );
}

export default function UserActionDrawer() {
  return (
    <DrawerProvider>
      <UserActionDrawerInner />
    </DrawerProvider>
  );
}
