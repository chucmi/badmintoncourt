import axiosClient from "./config/axios";

import { notification } from "antd";

let notificationDisplayed = false;

export const createBookingOrdersBulk = async (orderItems) => {
  try {
    const response = await axiosClient.post(
      "/v1/bookingOrders/create",
      orderItems
    );
    if (!notificationDisplayed) {
      notification.success({
        message: "Đặt hàng thành công",
        description: "Đơn hàng của bạn đã được đặt thành công.",
      });
      notificationDisplayed = true;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    if (!notificationDisplayed) {
      notification.error({
        message: "Lỗi đặt hàng",
        description: "Sân đã có người đặt trước. Vui lòng thử lại sau.",
      });
      notificationDisplayed = true;
    }
    throw error;
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axiosClient.get(`/v1/bookingOrders/user/${userId}`);
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: "Some thing wrong. Please try later!",
        description:
          error?.message || "Đã xảy ra lỗi xảy ra. Vui lòng thử lại sau.",
      });
      notificationDisplayed = true;
    }
    throw error;
  }
};

export const updateOrderStatus = async (orderId) => {
  try {
    const response = await axiosClient.patch(
      `/v1/bookingOrders/status/${orderId}`
    );
    return response.data;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: "Some thing wrong. Please try later!",
        description:
          error?.message || "Đã xảy ra lỗi xảy ra. Vui này thử lại sau.",
      });
      notificationDisplayed = true;
    }
    throw error;
  }
};
