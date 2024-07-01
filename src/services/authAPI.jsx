import axiosClient from "./config/axios";

import { notification } from "antd";

let notificationDisplayed = false;

const login = async (username, password) => {
  try {
    const { data } = await axiosClient.post("/v1/auth/signin", {
      username,
      password,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("refresh_token", data.refresh_token);
    return data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
      notificationDisplayed = true;
    }
  }
};

const logout = async () => {
  const token = localStorage.getItem("token");

  try {
    await axiosClient.post(
      "/v1/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
      notificationDisplayed = true;
    }
  }

  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
};

export { login, logout };

export const account = async () => {
  try {
    const response = await axiosClient.get("/v1/auth/account"); 
    if (response.data && response.data.status === 1) {
      return response.data.data;
    } else {
      notification.error({
        message: response.data.message || "Unable to fetch account information.",
      });
      return null;
    }
  } catch (error) {
    notification.error({
      message: error?.message || "Some thing wrong. Please try later!",
    });
    return null;
  }
};
