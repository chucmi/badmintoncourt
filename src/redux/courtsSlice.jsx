import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getYards } from "../services/yardAPI";

export const fetchCourts = createAsyncThunk("courts/fetchCourts", async () => {
  const data = await getYards();
  return data;
});

const courtsSlice = createSlice({
  name: "courts",
  initialState: {
    courts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courts = action.payload;
      })
      .addCase(fetchCourts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default courtsSlice.reducer;
