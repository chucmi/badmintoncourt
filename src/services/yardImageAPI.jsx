import axiosClient from "./config/axios";
import { notification } from "antd";

let notificationDisplayed = false;

export const createYardImage = async (data) => {
  try {
    const response = await axiosClient.post(
      "/v1/yardImages/add-new-image",
      data
    );
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

export const getYardImages = async (yard_id) => {
  try {
    const response = await axiosClient.get(
      `/v1/yardImages/get-images/${yard_id}`
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

export const deleteYardImage = async (id) => {
  try {
    const response = await axiosClient.delete(`/v1/yardImages/delete/${id}`);
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
