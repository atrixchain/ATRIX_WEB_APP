import { ReactNode } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotification = async (
  message: string,
  description: string,
  type: NotificationType,
  api : any,
  duration : number,
  btn : ReactNode
) => {
  api[type]({
    message: message,
    description: description || "",
    duration: duration,
    btn : btn
  });
};