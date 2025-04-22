import { Flex, Image } from "antd";
import GiftItem from "../components/GiftItem";
import PC from "../../../assets/pc.png";
import Tabs from "../components/Tabs";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { GIFTS } from "../../../utils/constant";

export default function GiftDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const gift = GIFTS[id];
  const images = Array.from({ length: 4 }).map(() => gift.image);

  return (
    <div className="max-w-screen-xl mx-auto mt-5 px-4">
      <Flex justify="center" className="md:flex-row flex-col">
        <Flex justify="start" className="lg:w-[40%] md:w-[50%] w-full">
          <Flex vertical justify="center">
            <GiftItem
              id={id}
              label={gift.label}
              image={gift.image}
              footer={" "}
            />
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, index) => {
                return (
                  <Image
                    key={index}
                    src={img}
                    className="md:!w-[94px] md:!h-[94px] border-2 p-3 border-[#374052] rounded-lg"
                  />
                );
              })}
            </div>
          </Flex>
        </Flex>
        <Flex vertical className="text-white lg:w-[60%] md:w-[50%] w-full">
          <div className="w-full">
            <Flex justify="end">
              <button onClick={() => navigate("/gift")}>
                <MdOutlineArrowCircleLeft className="text-[var(--color-brand-primary)] text-4xl" />
              </button>
            </Flex>
            <h1 className="xl:text-5xl lg:text-3xl text-xl font-bold uppercase text-[var(--color-brand-primary)] font-times">
              {gift.label}
            </h1>
            <div className="h-[2px] bg-[var(--color-brand-primary)] my-3"></div>
            <Flex
              vertical
              gap={15}
              className="my-2 xl:text-3xl lg:text-xl text-sm !font-times"
            >
              <p>
                * Tất cả hội viên tham gia tại NEW88 chỉ cần đạt từ VIP 3 trở
                lên đều có thể đăng ký nhận quà.
              </p>
              <p>
                * Lưu ý: Khi hội viên đăng ký nhận quà từ NEW88 vui lòng nhập
                đúng thông tin hiện tại.
              </p>
            </Flex>
            {/* <button
              className="uppercase text-white font-semibold w-fit px-8 py-2"
              style={{
                borderRadius: "99.188px",
                border: "1.984px solid var(--1, #FF9400)",
              }}
            >
              đánh giá
            </button> */}
          </div>
        </Flex>
      </Flex>

      <div className="my-5">
        <Tabs />
      </div>
    </div>
  );
}
