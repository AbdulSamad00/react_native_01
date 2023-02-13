import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoctors } from "../api/doctors";

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    const { ok, data } = await getDoctors();
    // console.log("doctors");
    // console.log(data);
    if (ok) {
      return data;
    }
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.doctors = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDoctors.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default doctorSlice.reducer;
