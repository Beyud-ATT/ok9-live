import { useQuery } from "@tanstack/react-query";
import { getMasterLink } from "../services/livestreamAPI";
import { toast } from "react-toastify";

export default function useGetMasterLink(masterLink) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["master-link", masterLink],
    queryFn: () => getMasterLink({ url: masterLink }),
    enabled: masterLink !== undefined && masterLink !== null,
  });

  if (isError) {
    if (error.status === 400) {
      return false;
    }

    toast.error(error.response.data.message);
  }

  return { masterLink: data, isLoading };
}
