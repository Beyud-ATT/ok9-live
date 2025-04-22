import { Flex, Image } from "antd";
import { FilledStar } from "../../../utils/svg";
import Img from "../../../assets/image.svg";

const comments = [1, 2, 3, 4];

export default function RatingComment() {
  return (
    <Flex className="w-full" vertical gap={30}>
      {comments.map((cmt, index) => (
        <Flex
          key={index}
          justify="space-between"
          align="center"
          className="md:flex-row flex-col"
        >
          <Flex align="center" gap={20}>
            <Image src={Img} />
            <Flex vertical gap={10}>
              <Flex gap={30}>
                <p className="text-[var(--color-brand-primary)] md:text-3xl text-[17px] font-semibold">
                  NGUYEN XUAN HIEU
                </p>
                <p className="md:text-lg text-sm">04:04:29 01-10-2024</p>
              </Flex>
              <p className="text-white md:text-lg text-sm">Verygood</p>
            </Flex>
          </Flex>
          <Flex gap={10}>
            <FilledStar className="lg:w-[34px] lg:h-[46px] w-[27px] h-[29px]" />
            <FilledStar className="lg:w-[34px] lg:h-[46px] w-[27px] h-[29px]" />
            <FilledStar className="lg:w-[34px] lg:h-[46px] w-[27px] h-[29px]" />
            <FilledStar className="lg:w-[34px] lg:h-[46px] w-[27px] h-[29px]" />
            <FilledStar className="lg:w-[34px] lg:h-[46px] w-[27px] h-[29px]" />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
