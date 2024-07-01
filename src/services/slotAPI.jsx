import axiosClient from "./config/axios";
import { notification } from "antd";

let notificationDisplayed = false;

export const createSlot = async (yardid, data) => {
  try {
    const response = await axiosClient.post(`v1/slots/create/${yardid}`, data);
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

export const updateSlot = async (slotid, data) => {
  try {
    const response = await axiosClient.put(`v1/slots/update/${slotid}`, data);
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
