import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPatients } from "../api/patients";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const { ok, data } = await getPatients();
    if (ok) return data;
    else return [];
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.patients = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPatients.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {} = patientSlice.actions;
export default patientSlice.reducer;
