import { useState } from "react";
import { Drawer, Menu } from "antd";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import { useMemo } from "react";
import { Link } from "react-router";
import useGetGeneralLinks from "../../../hooks/useGetGeneralLinks";

export default function BurgerTopNav() {
  const { generalLinks } = useGetGeneralLinks();

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState("home");

  const items = useMemo(
    () => [
      {
        label: <Link to={generalLinks?.linkWeb}>Trang chủ</Link>,
        key: "home",
        render: (props) => {
          return (
            <Link to={generalLinks?.linkWeb} {...props}>
              Trang chủ
            </Link>
          );
        },
      },
      // {
      //   label: "Live",
      //   key: "live",
      //   render: (props) => (
      //     <Link to="/" {...props}>
      //       Live
      //     </Link>
      //   ),
      // },
      // {
      //   label: "Liveshow",
      //   key: "liveshow",
      //   render: (props) => (
      //     <Link to="/" {...props}>
      //       Liveshow
      //     </Link>
      //   ),
      // },

      // {
      //   label: "Game +",
      //   key: "game",
      //   render: (props) => (
      //     <Link to="/" {...props}>
      //       Game+
      //     </Link>
      //   ),
      // },
      {
        label: "Quà Tặng",
        key: "gift",
        render: (props) => (
          <Link to="/gift" {...props}>
            Quà Tặng
          </Link>
        ),
      },
      {
        label: (
          <Link to={generalLinks?.linkApp} target="_blank">
            Tải App
          </Link>
        ),
        key: "download",
        render: (props) => (
          <Link to={generalLinks?.linkApp} target="_blank" {...props}>
            Tải App
          </Link>
        ),
      },
    ],
    [generalLinks]
  );

  return (
    <div className="md:hidden block">
      <button
        className="rounded-full bg-[var(--background-color)] hover:bg-[var(--background-color)] flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <TfiMenuAlt className="text-2xl" />
      </button>
      <Drawer
        title={
          <IoClose className="mt-4 text-2xl" onClick={() => setIsOpen(false)} />
        }
        placement={"left"}
        closable={false}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        key="left"
        className="!bg-[var(--background-color)]"
      >
        <Menu
          mode="vertical"
          selectedKeys={[current]}
          onClick={(e) => {
            setCurrent(e.key);
            setIsOpen(false);
          }}
        >
          {items.map((item) => (
            <Menu.Item key={item.key}>{item.render()}</Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </div>
  );
}
