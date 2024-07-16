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

export const getFeedbacks = async () => {
  try {
    const response = await axiosClient.get("/v1/feedback");
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

export const getFeedbacksByYardId = async (yard_id) => {
  try {
    const response = await axiosClient.get(`/v1/feedback/yard/${yard_id}`);
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
