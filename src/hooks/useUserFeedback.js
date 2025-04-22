import { useMutation } from "@tanstack/react-query";
import { userComment } from "../services/userAPI";
import { toast } from "react-toastify";

export default function useUserFeedback() {
  return useMutation({
    mutationFn: userComment,
    onSuccess: () => {
      toast.success("Phản hồi của bạn đã được gửi thành công!");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.error("Error in updateAccount:", error);
    },
  });
}
