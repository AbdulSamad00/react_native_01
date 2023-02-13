import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../api/users";

export const fetchUsers = createAsyncThunk("kanbans/fetchUsers", async () => {
  const { ok, data } = await getUsers();
  if (ok) {
    return data;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
