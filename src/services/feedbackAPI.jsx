import axiosClient from "./config/axios";

import { notification } from "antd";

let notificationDisplayed = false;

export const createFeedback = async (data) => {
  try {
    const response = await axiosClient.post("/v1/feedback/create", data);
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
      notificationDisplayed = true;
    }
  }
};
