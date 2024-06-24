import axiosClient from "./config/axios";

import { notification } from "antd";

let notificationDisplayed = false;

export const createBookingOrdersBulk = async (orderItems) => {
  try {
    const response = await axiosClient.post(
      "/v1/createBookingOrders/bulk",
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
    if (!notificationDisplayed) {
      notification.error({
        message: "Lỗi đặt hàng",
        description: "Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.",
      });
      notificationDisplayed = true;
    }
    throw error;
  }
};
