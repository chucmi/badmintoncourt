import axiosClient from "./config/axios";
import { notification } from "antd";

let notificationDisplayed = false;

export const getAllStaffs = async (managerId, page = 0, size = 100) => {
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
    if (response.data.data === null) {
      throw new Error("Failed to create user. Please try again later.");
    } else {
      return response.data;
    }
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

export const getUser = async (userId) => {
  try {
    const response = await axiosClient.get(`/v1/user/${userId}`);
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: "Error",
        description: "Failed to fetch user. Please try again later.",
      });
      notificationDisplayed = true;
    }
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUser = async (data, userId) => {
  try {
    const response = await axiosClient.put(`/v1/user/${userId}`, data);
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: "Error",
        description: "Failed to update user. Please try again later.",
      });
      notificationDisplayed = true;
    }
    console.error("Error updating user:", error);
    throw error;
  }
};

export const toggleStatus = async (userId) => {
  try {
    const response = await axiosClient.patch(
      `/v1/user/toggle-status/${userId}`
    );
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: "Error",
        description: "Failed to update user. Please try again later.",
      });
      notificationDisplayed = true;
    }
    console.error("Error updating user:", error);
    throw error;
  }
};

export const updateProfile = async (data, id) => {
  try {
    const response = await axiosClient.put(
      `/v1/auth/account/update_profile/${id}`,
      data
    );
    if (response.data.data === null) {
      throw new Error("Failed to update profile. Please try again later.");
    } else {
      return response.data;
    }
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: "Error",
        description: "Failed to update profile. Please try again later.",
      });
      notificationDisplayed = true;
    }
    console.error("Error updating profile:", error);
    throw error;
  }
};
