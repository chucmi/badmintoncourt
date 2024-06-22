import { configureStore } from "@reduxjs/toolkit";
import courtsReducer from "../courtsSlice";

const store = configureStore({
  reducer: {
    courts: courtsReducer,
  },
});

export default store;
