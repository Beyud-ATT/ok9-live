import { useQuery } from "@tanstack/react-query";
import { getDetailLivestream } from "../services/livestreamAPI";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

export default function useLiveDetail(id) {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["live-detail", id, isAuthenticated],
    queryFn: () => getDetailLivestream(id),
    enabled: id !== undefined && id !== null,
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { data, isLoading };
}
