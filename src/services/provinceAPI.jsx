import { notification } from "antd";
import axios from "axios";

let notificationDisplayed = false;

export const getProvinces = async () => {
  try {
    const response = await axios.get("https://vapi.vnappmob.com/api/province/");
    return response.data.results;
  } catch (error) {
    if (!notificationDisplayed) {
      notification.error({
        message: error?.message || "Some thing wrong. Please try later!",
      });
      notificationDisplayed = true;
    }
  }
};
