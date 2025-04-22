import {
  Form,
  Input,
  Button,
  Typography,
  Upload,
  Image,
  Flex,
  Divider,
  Select,
  DatePicker,
} from "antd";
import { FaCopy, FaRegUser, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import useLivestreamConfig from "../../../hooks/useLivestreamConfig";
import useLivestreamKeyCreate from "../../../hooks/useLivestreamConfigCreate";
import useLiveStreamConfigUpdate from "../../../hooks/useLiveStreamConfigUpdate";
import useLivestreamKeyUpdate from "../../../hooks/useLivestreamKeyUpdate";
import useLivestreamConfigCreateLiveSession from "../../../hooks/useLivestreamConfigCreateLiveSession";
import DeviceProvider from "../../../contexts/ResponsiveContext";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import useGetRTMPServers from "../../../hooks/useGetRTMPServers";

const formStyle = "md:w-2/3 w-full mx-auto";

const dateFields = ["scheduleTime"];

const LivestreamConfigForm = () => {
  const { data, isLoading } = useLivestreamConfig();
  const livestreamData = data?.data?.data;

  return (
    <>
      <Typography.Title
        level={2}
        className="!text-[var(--color-brand-primary)] lg:text-left text-center lg:!mb-4 uppercase font-bold"
      >
        {!livestreamData ? "Tạo" : "Thay đổi"} cấu hình livestream
      </Typography.Title>
      <div className="md:w-[80%] w-full h-full md:bg-[var(--background-color-2)] md:py-8 px-4 lg:mx-0 mx-auto">
        <DeviceProvider.MOBILE>
          <Divider
            className={`${formStyle} !border-[var(--color-brand-primary)]`}
          />
        </DeviceProvider.MOBILE>
        <LivestreamConfigInfoForm
          livestreamData={livestreamData}
          isLoading={isLoading}
        />
        <Divider
          className={`${formStyle} !border-[var(--color-brand-primary)]`}
        />
        <LivestreamConfigCreateSessionForm
          livestreamData={livestreamData}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

function ServerStreamField({ value, ...rest }) {
  const [serverStream, setServerStream] = useState(value);

  const handleCopy = () => {
    navigator.clipboard.writeText(serverStream);
    toast.success("Đã copy Server Stream!");
  };

  useEffect(() => {
    setServerStream(value);
  }, [value]);

  return (
    <div className="relative">
      <Input
        placeholder="Stream key"
        value={serverStream}
        className="w-full !bg-[#dbdbdb]"
        disabled
      />
      <FaCopy
        onClick={handleCopy}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[var(--color-brand-primary)] text-2xl"
      />
    </div>
  );
}

function StreamkeyField({ value, ...rest }) {
  const [streamKey, setStreamKey] = useState(value);
  const { mutate: refreshStreamKey, isLoading } = useLivestreamKeyUpdate();

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Đã copy Stream Key!");
  };

  const handleUpdateStreamKey = () => {
    refreshStreamKey();
  };

  useEffect(() => {
    setStreamKey(value);
  }, [value]);

  return (
    <div className="relative">
      <Input
        placeholder="Stream key"
        value={streamKey}
        className="w-full !bg-[var(--disabled-field-bg)]"
        disabled
      />
      {isLoading ? (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-brand-primary)]"></div>
        </div>
      ) : (
        <>
          <FaCopy
            onClick={handleCopy}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[var(--color-brand-primary)] text-2xl"
          />
          <RiRefreshLine
            onClick={handleUpdateStreamKey}
            className="absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer text-[var(--color-brand-primary)] text-2xl"
          />
        </>
      )}
    </div>
  );
}

function LivestreamConfigInfoForm({ livestreamData, isLoading }) {
  const [form] = Form.useForm();
  const [newThumbnail, setNewThumbnail] = useState(null);
  const [newMobileThumbnail, setNewMobileThumbnail] = useState(null);

  const {
    mutate: updateLivestreamConfig,
    isLoading: isUpdating,
    isError: isUpdateError,
  } = useLiveStreamConfigUpdate();
  const {
    mutate: createLivestreamConfig,
    isLoading: isCreating,
    isError: isCreateError,
  } = useLivestreamKeyCreate();
  const { data: rtmpServers, isLoading: isRTMPServersLoading } =
    useGetRTMPServers();
  const rtmpOptions = rtmpServers?.data?.data?.map((server) => ({
    value: server.id,
    label: server.spaceName,
  }));

  useEffect(() => {
    if (
      (!isLoading && livestreamData && !isUpdating && !isCreating) ||
      isUpdateError ||
      isCreateError
    ) {
      if (livestreamData) {
        form.setFieldsValue({
          ...livestreamData,
          rtmpServerId: livestreamData?.session?.rtmpServerId,
        });
      }
    }
  }, [
    isLoading,
    livestreamData,
    form,
    isUpdating,
    isCreating,
    isUpdateError,
    isCreateError,
  ]);

  const handleRemoveThumbnail = () => {
    setNewThumbnail(null);
    handleFinish({
      ...livestreamData,
      thumbnail: "",
    });
  };

  const handleRemoveMobileThumbnail = () => {
    setNewMobileThumbnail(null);
    handleFinish({
      ...livestreamData,
      mobileThumbnail: "",
    });
  };

  const handleFinish = (values) => {
    try {
      const data = {
        ...values,
        thumbnail:
          values?.thumbnail === ""
            ? ""
            : livestreamData?.thumbnail || newThumbnail,
        mobileThumbnail:
          values?.mobileThumbnail === ""
            ? ""
            : livestreamData?.mobileThumbnail || newMobileThumbnail,
        newThumbnail,
        newMobileThumbnail,
      };

      !livestreamData
        ? createLivestreamConfig(data)
        : updateLivestreamConfig(data);

      setNewThumbnail(null);
      setNewMobileThumbnail(null);
    } catch (error) {
      console.error("Error in signup:", error);
    }
  };

  return (
    <div className={`${formStyle}`}>
      <Typography.Title
        level={3}
        className="!text-[var(--color-brand-primary)] pb-2"
      >
        Cấu hình livestream
      </Typography.Title>
      <Form
        form={form}
        id="livestream-config-form"
        className="space-y-4"
        onFinish={handleFinish}
        layout="vertical"
        disabled={isLoading || isUpdating}
      >
        <Form.Item name="thumbnail" hidden>
          <Input placeholder="Thumbnail" hidden />
        </Form.Item>

        <Form.Item
          name={!livestreamData ? "thumbnail" : "newThumbnail"}
          label={
            <span className="text-[var(--color-brand-primary)]">
              Hình đại diện
            </span>
          }
        >
          <Flex gap={10}>
            {livestreamData?.thumbnail && (
              <Image
                src={livestreamData?.thumbnail}
                alt="thumbnail"
                loading="lazy"
                width={100}
              />
            )}
            <Flex gap={4}>
              <Upload
                listType="picture-circle"
                maxCount={1}
                beforeUpload={(file) => {
                  setNewThumbnail(file);
                  return false;
                }}
                showUploadList={{ showPreviewIcon: false }}
              >
                <FaRegUser className="text-xl text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] w-full h-full p-4" />
              </Upload>
              <Button
                type="text"
                icon={<FaTrash />}
                className="text-[var(--color-brand-primary)]"
                onClick={handleRemoveThumbnail}
              >
                Xóa
              </Button>
            </Flex>
          </Flex>
        </Form.Item>

        <Form.Item
          name={!livestreamData ? "mobileThumbnail" : "newMobileThumbnail"}
          label={
            <span className="text-[var(--color-brand-primary)]">
              Hình đại diện mobile
            </span>
          }
        >
          <Flex gap={10}>
            {livestreamData?.mobileThumbnail && (
              <Image
                src={livestreamData?.mobileThumbnail}
                alt="mobileThumbnail"
                loading="lazy"
                width={100}
              />
            )}
            <Flex gap={4}>
              <Upload
                listType="picture-circle"
                maxCount={1}
                beforeUpload={(file) => {
                  setNewMobileThumbnail(file);
                  return false;
                }}
                showUploadList={{ showPreviewIcon: false }}
              >
                <FaRegUser className="text-xl text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] w-full h-full p-4" />
              </Upload>
              <Button
                type="text"
                icon={<FaTrash />}
                className="text-[var(--color-brand-primary)]"
                onClick={handleRemoveMobileThumbnail}
              >
                Xóa
              </Button>
            </Flex>
          </Flex>
        </Form.Item>

        <Form.Item
          name="title"
          label={
            <span className="text-[var(--color-brand-primary)]">Tiêu đề</span>
          }
        >
          <Input placeholder="Tiêu đề" />
        </Form.Item>

        <Form.Item
          name="rtmpServerId"
          label={
            <span className="text-[var(--color-brand-primary)]">
              RTMP Server
            </span>
          }
        >
          <Select placeholder="RTMP Server" options={rtmpOptions} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[var(--color-brand-primary)] hover:bg-orange-600 mt-5"
            disabled={isLoading || isUpdating || isCreating}
          >
            {isLoading || isUpdating || isCreating
              ? "Đang tạo..."
              : "Lưu thông tin"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function LivestreamConfigCreateSessionForm({ livestreamData }) {
  const [form] = Form.useForm();
  const { mutate: createSession, isLoading: isCreating } =
    useLivestreamConfigCreateLiveSession();
  const sessionData = livestreamData?.session;

  useEffect(() => {
    if (!isCreating && sessionData) {
      if (sessionData) {
        dateFields.map((field) => {
          sessionData[field] = dayjs(sessionData[field] || dayjs());
        });
        form.setFieldsValue(sessionData);
      }
    }
  }, [isCreating, sessionData, form]);

  const handleFinish = (values) => {
    try {
      createSession(values);
    } catch (error) {
      console.error("Error in createSession:", error);
    }
  };

  return (
    <div className={`${formStyle} mt-8`}>
      <Typography.Title
        level={3}
        className="!text-[var(--color-brand-primary)] pb-2"
      >
        Cấu hình live session
      </Typography.Title>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          name="scheduleTime"
          label={
            <span className="text-[var(--color-brand-primary)]">
              Lập lịch hẹn livestream
            </span>
          }
        >
          <DatePicker
            showTime
            placeholder="Lập lịch hẹn livestream"
            format="DD/MM/YYYY HH:mm"
            className="w-full"
          />
        </Form.Item>

        {sessionData && (
          <>
            <Form.Item
              label={
                <span className="text-[var(--color-brand-primary)]">
                  Server Stream
                </span>
              }
            >
              <ServerStreamField value={sessionData?.rtmpEndpoint} />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-[var(--color-brand-primary)]">
                  Stream key
                </span>
              }
            >
              <StreamkeyField value={sessionData?.sessionStreamKey} />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[var(--color-brand-primary)] hover:bg-orange-600 mt-5"
            disabled={isCreating}
          >
            Tạo live session
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LivestreamConfigForm;
