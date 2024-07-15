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
};

export const getTransactionOfUser = async (userId) => {
  try {
    const response = await axiosClient.get(`/payments/user/${userId}`);
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

export const createPayment = async (amount, bookingCode) => {
  try {
    const response = await axiosClient.get(
      "/payments/vn-pay?amount=" +
        amount +
        "&bookingCode=" +
        bookingCode +
        "&bankCode=NCB"
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

export const getPaymentsOfYard = async (yardId) => {
  try {
    const response = await axiosClient.get(`/payments/yard/${yardId}`);
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
