import { useQuery } from "@tanstack/react-query";
import { getGeneralLinks } from "../services/homeAPI";
import { toast } from "react-toastify";

export default function useGetGeneralLinks() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["general-links"],
    queryFn: getGeneralLinks,
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { generalLinks: data, isLoading };
}
