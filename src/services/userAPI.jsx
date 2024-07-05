import axiosClient from "./config/axios";
import { notification } from "antd";

let notificationDisplayed = false;

export const getAllStaffs = async (managerId, page = 0, size = 10) => {
  try {
    const response = await axiosClient.get(
      `/v1/user/manager?managerId=${managerId}&page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: "Error",
        description: "Failed to fetch staff data. Please try again later.",
      });
      notificationDisplayed = true;
    }
    console.error("Error fetching staff data:", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await axiosClient.post("/v1/user/create", data);
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: "Error",
        description: "Failed to create user. Please try again later.",
      });
      notificationDisplayed = true;
    }
    console.error("Error creating user:", error);
    throw error;
  }
};
