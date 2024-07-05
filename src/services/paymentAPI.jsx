import axiosClient from "./config/axios";
import { notification } from "antd";

let notificationDisplayed = false;

export const getPayments = async () => {
  try {
    const response = await axiosClient.get("/payments");
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
      notificationDisplayed = true;
    }
  }
}

export const getTransactionOfUser = async (userId) => {
  try {
    const response = await axiosClient.get(`/payments/user/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
      notificationDisplayed = true;
    }
  }
}
