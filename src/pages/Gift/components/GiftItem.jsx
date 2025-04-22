import { Flex } from "antd";
import { useNavigate } from "react-router";

export default function GiftItem({ id, label, image, footer, ...rest }) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="relative min-w-[100px] min-h-[120px] bg-[url('/src/assets/gift-bg.webp')] bg-contain bg-center bg-no-repeat">
        <div className="w-[70%] h-[15%] text-center lg:text-[15px] md:text-[10px] text-[8px] font-[860] uppercase text-[#232936] absolute top-0 right-0">
          <Flex className="h-full font-bold justify-center items-center">
            {label}
          </Flex>
        </div>
        <Flex
          vertical
          justify="end"
          align="center"
          className="w-full h-full pt-6"
        >
          <img
            src={image}
            alt="gift-bg"
            loading="lazy"
            className="md:!w-[80%] md:!h-[70%] !w-[60%] !h-[60%] p-2"
          />
        </Flex>
      </div>
      <Flex justify="center" align="center" className="mt-4">
        {!footer ? (
          <button
            className="py-1 px-4 border-[1.229px] border-[var(--color-brand-primary)] rounded-[61.448px]"
            onClick={() => {
              navigate(`/gift/${id}`);
            }}
          >
            <span className="text-[12px] uppercase text-white">
              chi tiết sản phẩm
            </span>
          </button>
        ) : (
          footer
        )}
      </Flex>
    </div>
  );
}
