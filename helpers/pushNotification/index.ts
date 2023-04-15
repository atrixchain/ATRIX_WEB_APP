import { ReactNode } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotification = async (
  message: string,
  description: string,
  type: NotificationType,
  api : any,
  btn : ReactNode
) => {
  api[type]({
    message: message,
    description: description || "",
    btn : btn
  });
};