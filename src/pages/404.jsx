import { Image } from "antd";
import NotFoundImg from "../assets/404.webp";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Image src={NotFoundImg} alt="404" preview={false} />
      <h1 className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
        404 - Not Found
      </h1>
      <button
        className="absolute top-1/2 left-1/4 translate-y-[100%] translate-x-[-50%] bg-[var(--color-brand-primary)] text-white font-bold px-7 py-2 rounded-md text-base"
        onClick={() => navigate("/")}
      >
        Về trang chủ
      </button>
    </div>
  );
}
