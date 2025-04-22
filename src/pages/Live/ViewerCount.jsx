import { FaRegEye } from "react-icons/fa";
import useLiveDetail from "../../hooks/useLiveDetail";
import { useParams } from "react-router";
import { useSignalR } from "../../contexts/SIgnalRContext";

export default function ViewerCount({ ...rest }) {
  const { id } = useParams();
  const { viewer } = useSignalR();
  const { data: liveData } = useLiveDetail(id);
  const { isStreaming, viewer: liveViewer } = liveData?.data?.data || {};

  return (
    <div
      className="flex items-center gap-1 md:text-base text-[.6rem] text-white"
      {...rest}
    >
      <span>
        {isStreaming && viewer !== 0
          ? viewer
          : isStreaming && liveViewer
          ? liveViewer
          : 0}
      </span>
      <FaRegEye />
    </div>
  );
}
