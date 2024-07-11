import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return [];
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.cartItems);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (!itemExists) {
        state.cartItems.push({ ...action.payload, addedAt: Date.now() });
        notification.success({
          message: "Đã thêm vào giỏ hàng",
          description: `${action.payload.name} đã được thêm vào giỏ hàng.`,
        });
      } else {
        notification.warning({
          message: "Sân đã tồn tại",
          description: `${action.payload.name} đã được thêm vào giỏ hàng.`,
        });
      }

      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      notification.info({
        message: "Sân đã xóa",
        description: `Sân đã được xoá khỏi giỏ hàng.`,
      });

      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      if (state.cartItems.length === 0) {
        notification.warning({
          message: "Sân không tồn tại",
          description: `Không có sân nào trong giỏ hàng.`,
        });
      } else {
        state.cartItems = [];
        notification.warning({
          message: "Xoá toàn bộ sân",
          description: `Tất ca sân đã đã được xoá khỏi giỏ hàng.`,
        });

        saveCartToLocalStorage(state);
      }
    },
    clearCartPayment: (state) => {
      if (state.cartItems.length === 0) {
        notification.warning({
          message: "Sân không tồn tại",
          description: `Không có sân nào trong giỏ hàng.`,
        });
      } else {
        state.cartItems = [];
        notification.info({
          message: "Đặt sân thành công",
          description: `Sân đã đã được đặt. Vui lòng kiểm tra lịch sử đặt sân.`,
        });

        saveCartToLocalStorage(state);
      }
    },
    removeExpiredItems: (state) => {
      const now = Date.now();
      const beforeCount = state.cartItems.length; // Get initial count of items

      state.cartItems = state.cartItems.filter(
        (item) => now - item.addedAt < 5 * 60 * 1000 // 5 minutes
      );

      const afterCount = state.cartItems.length; // Get count of items after filtering

      // Check if any items were actually removed
      if (beforeCount > afterCount) {
        notification.info({
          message: "Sân đã hết hạn",
          description: `Sân đã được xoá khỏi giỏ hàng do hết thời gian.`,
        });
      }

      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  removeExpiredItems,
  clearCartPayment,
} = cartSlice.actions;

export default cartSlice.reducer;
