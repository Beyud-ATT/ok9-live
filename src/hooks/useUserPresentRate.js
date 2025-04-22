import { useMutation } from "@tanstack/react-query";
import { userPrentRate } from "../services/userAPI";
import { toast } from "react-toastify";

export default function useUserPresentRate() {
  return useMutation({
    mutationFn: userPrentRate,
    onSuccess: () => {
      toast.success("Đánh giá của bạn đã được gửi thành công!");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.error("Error in updateAccount:", error);
    },
  });
}
