import { useEffect, useRef, useState } from "react";
import { CompoundModal, useModal } from "./CompoundModal";
import { Button, Form, Input } from "antd";
import Idol from "../assets/idol_rating_header.png";
import OneStar from "../assets/one_star.png";
import TwoStar from "../assets/two_star.png";
import ThreeStar from "../assets/three_star.png";
import FourStar from "../assets/four_star.png";
import FiveStar from "../assets/five_star.png";
import useIdolRate from "../hooks/useIdolRate";
import useLiveDetail from "../hooks/useLiveDetail";
import { useParams } from "react-router";
import { EmptyStar, FilledStar } from "../utils/svg";

const reviewContent = [
  "Chưa đánh giá",
  "Rất không hài lòng",
  "Không hài lòng",
  "Bình thường",
  "Hài lòng",
  "Rất hài lòng",
];

const starImages = [Idol, OneStar, TwoStar, ThreeStar, FourStar, FiveStar];

function IdolRatingContent({ liveData }) {
  const [star, setStar] = useState(0);
  const [form] = Form.useForm();
  const { mutate: idolRate, isLoading } = useIdolRate();
  const { closeModal } = useModal();

  function handleFinish(values) {
    idolRate(
      {
        ...values,
        livestreamSessionId: liveData?.livestreamSessionId,
        idolId: liveData?.userId,
        rate: star,
      },
      {
        onSuccess: () => {
          localStorage.setItem(`${liveData?.userCode}-rate`, true);
          closeModal();
          form.resetFields();
          setStar(0);
        },
      }
    );
  }

  return (
    <>
      <div>
        {star === 0 ? (
          <img
            src={starImages[star]}
            className={`mx-auto z-0 w-[203px] h-[193px] md:translate-y-[45%] translate-y-[20%]`}
          />
        ) : (
          <img
            src={starImages[star]}
            className={`mx-auto z-0 w-[88px] h-[88px] md:translate-y-[130%] translate-y-[80%]`}
          />
        )}
      </div>

      <div
        className={`rounded-b-2xl z-10 mx-auto 
            flex flex-col justify-center items-center gap-1
            bg-gradient-to-b from-[white] to-transparent
            md:w-[95%] w-[90%]
            ${
              star === 0
                ? "md:translate-y-[12%] -translate-y-5"
                : "md:translate-y-[50%] translate-y-20 mt-[5px]"
            }`}
      >
        <p className="font-bold capitalize md:text-xl text-lg">
          idol hôm nay thế nào?
        </p>
        <div className="flex items-center md:gap-4 gap-2">
          {Array.from({ length: 6 }).map((_, index) =>
            index === 0 ? null : index <= star ? (
              <div key={index} onClick={() => setStar(index)}>
                <FilledStar key={index} />
              </div>
            ) : (
              <div key={index} onClick={() => setStar(index)}>
                <EmptyStar key={index} />
              </div>
            )
          )}
        </div>
        <p className="font-bold md:text-lg text-base">{reviewContent[star]}</p>

        <Form form={form} id="idol-rating-form" onFinish={handleFinish}>
          <Form.Item name="comment">
            <Input.TextArea
              placeholder="Nhận xét của bạn"
              rows={{ xs: 2, md: 4 }}
              cols={60}
              className="w-full"
            />
          </Form.Item>

          <Form.Item className="w-full">
            <Button
              htmlType="submit"
              className="w-full uppercase !text-white border-none md:text-lg text-base md:py-6 py-4"
              style={{
                borderRadius: 8,
                background:
                  "linear-gradient(90deg, #FF4137 0%, #F77300 47.59%, #F43 100%)",
                boxShadow:
                  "2px 0px 6px 0px rgba(0, 0, 0, 0.25) inset, 0px 0px 6px 0px #FAA41A",
              }}
              disabled={isLoading || star === 0}
            >
              Đánh giá
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default function IdolRating() {
  const triggerRef = useRef(null);

  const { id } = useParams();
  const { data } = useLiveDetail(id);
  const liveData = data?.data?.data;

  useEffect(() => {
    if (liveData?.isLastRate) {
      triggerRef.current.click();
    }
  }, [liveData]);

  return (
    <CompoundModal>
      <CompoundModal.Trigger
        render={(openModal) => (
          <button
            id="idol-rating-trigger"
            ref={triggerRef}
            onClick={openModal}
            className="hidden invisible opacity-0"
          >
            Idol Rating
          </button>
        )}
      />
      <CompoundModal.Content
        classNames={{
          content: `md:bg-[url('/src/assets/idol_rating_bg.png')] bg-[url('/src/assets/idol_rating_bg_mb.png')] 
          bg-center bg-no-repeat bg-contain !rounded-3xl !p-0 
          md:min-w-[551px] md:min-h-[527px] md:w-full w-[290px] h-[409px] mx-auto`,
        }}
        closeIcon={false}
      >
        <IdolRatingContent liveData={liveData} />
      </CompoundModal.Content>
    </CompoundModal>
  );
}
