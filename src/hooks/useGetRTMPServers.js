import { useQuery } from "@tanstack/react-query";
import { getRTMPServers } from "../services/livestreamConfigAPI";
import { toast } from "react-toastify";

export default function useGetRTMPServers() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["rtmp-servers"],
    queryFn: getRTMPServers,
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { data, isLoading };
}
