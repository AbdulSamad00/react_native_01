import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getKanbans } from "../api/kanbans";

export const fetchKanbans = createAsyncThunk(
  "kanbans/fetchKanbans",
  async () => {
    const { ok, data } = await getKanbans();
    if (ok) return data;
    else return [];
  }
);

const kanbanSlice = createSlice({
  name: "kanbans",
  initialState: {
    kanbans: [],
    selectedKanban: {},
    loading: false,
  },
  reducers: {
    getKanbansFromState: (state) => {
      return state.kanbans;
    },
    setSelectedKanbanToState: (state, action) => {
      state.selectedKanban = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchKanbans.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchKanbans.fulfilled, (state, action) => {
      state.kanbans = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchKanbans.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { getKanbansFromState, setSelectedKanbanToState } =
  kanbanSlice.actions;
export default kanbanSlice.reducer;
