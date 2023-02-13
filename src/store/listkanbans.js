import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSelectedKanbanListkanbans } from "../api/listkanbans";

export const fetchListkanbans = createAsyncThunk(
  "listkanbans/fetchListkanbans",
  async (kanbanNo) => {
    const { ok, data } = await getSelectedKanbanListkanbans(kanbanNo);
    if (ok) {
      const filterdListkanbans = data.map((listkanban) => {
        return {
          ...listkanban,
          id: listkanban._id,
          rows: listkanban.cards.map((card) => ({ ...card, id: card._id })),
          cards: [],
        };
      });
      return filterdListkanbans;
    } else {
      return [];
    }
  }
);

const listkanbanSlice = createSlice({
  name: "listkanbans",
  initialState: {
    listkanbans: [],
    loading: false,
  },
  reducers: {
    getListkanbansFromState: (state) => {
      return state.listkanbans;
    },
    setListkanbansFromState: (state, action) => {
      state.listkanbans = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListkanbans.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListkanbans.fulfilled, (state, action) => {
      state.listkanbans = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchListkanbans.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setListkanbansFromState, getListkanbansFromState } =
  listkanbanSlice.actions;
export default listkanbanSlice.reducer;
