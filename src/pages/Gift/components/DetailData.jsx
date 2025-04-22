import { Flex } from "antd";
import { useParams } from "react-router";
import { GIFTS } from "../../../utils/constant";
import { useEffect } from "react";

export default function DetailData() {
  const { id } = useParams();
  const gift = GIFTS[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Flex vertical className="gap-5">
      <Flex vertical className="w-full text-white" gap={5}>
        <h2 className="text-xl font-bold uppercase text-[var(--color-brand-primary)] font-times">
          {gift.label}
        </h2>
        <div className="font-times">{gift.description}</div>
      </Flex>
    </Flex>
  );
}
