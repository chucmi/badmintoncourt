import axiosClient from "./config/axios";

import { notification } from "antd";

let notificationDisplayed = false;

export const updateCheckin = async (data) => {
  try {
    const response = await axiosClient.patch("/v1/checkIn/status", data);
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

export const getCheckinsOfYard = async (yardId) => {
  try {
    const response = await axiosClient.get(
      `/v1/checkIn/findByYardId?yardId=${yardId}`
    );
    return response.data.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
      notificationDisplayed = true;
    }
  }
};
