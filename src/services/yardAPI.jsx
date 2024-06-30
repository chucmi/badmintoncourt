import axiosClient from "./config/axios";
import { notification } from "antd";

let notificationDisplayed = false;

export const getYards = async (pageNumber = 0) => {
  try {
    const response = await axiosClient.get(
      `/v1/yards/active?pageNumber=${pageNumber}`
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


// export const getYards2 = async (pageNumber) => {
//   try {
//     const response = await axiosClient.get(`/v1/yards?pageNumber=${pageNumber}`);
//     console.log(response);
//     return {
//       data: response.data.data,
//       totalPages: response.data.totalPages,
//     };
//   } catch (error) {
//     if (!notificationDisplayed) {
//       notification.error({
//         message: error?.message || "Something went wrong. Please try later!",
//       });
//       notificationDisplayed = true;
//     }
//     throw error;
//   }
// };

export const getYardDetail = async (id) => {
  try {
    const response = await axiosClient.get(`/v1/yards/${id}`);
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

export const createYard = async (data) => {
  try {
    const response = await axiosClient.post("/v1/yards/create", data);

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
