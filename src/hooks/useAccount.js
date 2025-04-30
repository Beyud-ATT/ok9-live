import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { getMe } from "../services/accountAPI";

export default function useAccount() {
  const { isAuthenticated, logout } = useAuth();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["account", isAuthenticated],
    queryFn: getMe,
    enabled: isAuthenticated,
  });

  if (isError) {
    if (error.status === 401) {
      logout();
      return;
    }
    toast.error(error.response.data.message);
  }

  return { data, isLoading, isError };
}
