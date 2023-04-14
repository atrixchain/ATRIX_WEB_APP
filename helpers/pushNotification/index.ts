type NotificationType = "success" | "info" | "warning" | "error";

export const openNotification = async (
  message: string,
  description: string,
  type: NotificationType,
  api : any,
) => {
  api[type]({
    message: message,
    description: description || "",
  });
};