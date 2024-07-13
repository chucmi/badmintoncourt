import axiosClient from "./config/axios";

import { notification } from "antd";

let notificationDisplayed = false;

export const createPhone = async (data) => {
  try {
    const response = await axiosClient.post(`/telephones`, data);
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

export const deletePhone = async (id) => {
  try {
    const response = await axiosClient.delete(`/telephones/${id}`);
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
