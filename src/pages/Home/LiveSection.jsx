import { Col, Image, Row, Spin } from "antd";
import useLiveHot from "../../hooks/useLiveHot";
import LivestreamPlayer from "../../components/VideoPlayer";
import { useEffect, useState } from "react";

const LiveSection = () => {
  const { data, isLoading } = useLiveHot();
  const liveData = data?.data?.data;
  const isJustifyBetween = liveData?.length >= 4;
  const [selectedStream, setSelectedStream] = useState(
    liveData?.at(0)?.streamId
  );

  useEffect(() => {
    if (liveData) {
      setSelectedStream(liveData?.at(0)?.streamId);
    }
  }, [liveData]);

  return (
    <Row className="pt-4">
      {/* Main Stream */}
      <Col xs={{ flex: "100%" }} md={{ flex: "80%" }}>
        <LivestreamPlayer liveId={selectedStream} />
      </Col>

      {/* Side Streams */}
      <Col
        xs={{ flex: "100%" }}
        md={{ flex: "20%" }}
        className="overflow-y-auto md:mt-0 mt-2"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spin />
          </div>
        ) : (
          <ul
            className={`flex md:flex-col ${
              isJustifyBetween ? "justify-between" : "gap-y-[1%]"
            } h-full`}
          >
            {liveData?.map((stream, index) => {
              const isSelected = selectedStream
                ? stream.streamId === selectedStream
                : index === 0;
              return (
                <li
                  key={index}
                  className="relative"
                  onClick={() => setSelectedStream(stream.streamId)}
                >
                  <Image
                    alt="Stream"
                    src={
                      stream.thumbnail ??
                      "https://newlive.sgp1.cdn.digitaloceanspaces.com/newlive/photo_2025-01-27_19-07-46.jpg"
                    }
                    className={`md:!w-[85%] md:!h-auto !w-[100px] !h-[55px] mx-auto object-cover aspect-video p-0.5 rounded-lg cursor-pointer ${
                      isSelected ? "bg-[var(--color-brand-primary)]" : ""
                    }`}
                    loading="lazy"
                    preview={false}
                    wrapperClassName="z-10"
                  />
                  <i
                    className={`${
                      isSelected
                        ? "new88-icon-banner-arrow-left z-0 md:block hidden"
                        : ""
                    }`}
                  ></i>
                </li>
              );
            })}
          </ul>
        )}
      </Col>
    </Row>
  );
};

export default LiveSection;
