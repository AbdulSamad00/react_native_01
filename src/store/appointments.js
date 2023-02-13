import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAppointments } from "../api/appointments";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const { ok, data } = await getAppointments();
    if (ok) {
      return data;
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAppointments.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default appointmentSlice.reducer;
