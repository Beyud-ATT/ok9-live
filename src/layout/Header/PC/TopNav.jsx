import { useEffect, useMemo, useState } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router";
import useGetGeneralLinks from "../../../hooks/useGetGeneralLinks";

const TopNav = ({ props }) => {
  const menuItemStyle = "font-semibold text-xl";
  const { generalLinks } = useGetGeneralLinks();
  const { linkWeb, linkApp, linkCode } = generalLinks?.data?.data || {};

  const pathname = useLocation().pathname.replace("/", "");
  const parsedPath = useMemo(() => {
    return pathname === ""
      ? "home"
      : pathname.includes("gift")
      ? "gift"
      : pathname;
  }, [pathname]);
  const [current, setCurrent] = useState(parsedPath);
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = useMemo(
    () => [
      {
        label: "Trang chủ",
        key: "home",
        render: (props) => {
          return (
            <Link
              to={linkWeb}
              {...props}
              className={menuItemStyle}
              target="_blank"
            >
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
      // {
      //   label: "Quà Tặng",
      //   key: "gift",
      //   render: (props) => (
      //     <Link to="/gift" {...props}>
      //       Quà Tặng
      //     </Link>
      //   ),
      // },
      // {
      //   label: (
      //     <Link to={linkApp} target="_blank">
      //       Tải App
      //     </Link>
      //   ),
      //   key: "download",
      //   render: (props) => (
      //     <Link to={linkApp} target="_blank" {...props}>
      //       Tải App
      //     </Link>
      //   ),
      // },
      {
        label: "Nhập Code",
        key: "code",
        render: (props) => (
          <Link
            to={linkCode}
            target="_blank"
            {...props}
            className={menuItemStyle}
          >
            Nhập Code
          </Link>
        ),
      },
    ],
    [linkCode, linkWeb]
  );

  useEffect(() => {
    setCurrent(parsedPath);
  }, [parsedPath]);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      className="w-full md:flex hidden justify-center"
      {...props}
    >
      {/* You have to do it like this, or else it will collapse into sub-menu */}
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.render()}</Menu.Item>
      ))}
    </Menu>
  );
};

export default TopNav;
