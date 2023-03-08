import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart(state) {
      console.log(state);
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess: (state, action) => {
      state.data.push(action.payload);
      return state;
    },
    addSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    removeSongStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },

    removeSongSuccess: (state, action) => {
      state.data = state.data.filter((song) => song.id !== action.payload);
      return state;
    },

    removeSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSongStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action) => {
      const index = state.data.findIndex(
        (song) => song.id === action.payload.id
      );
      state[index] = action.payload;
      return state;
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getStatisticsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsFailure,
  fetchSongsStart,
  fetchSongsSuccess,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  removeSongStart,
  removeSongSuccess,
  removeSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  getStatisticsFailure,
  getStatisticsStart,
  getStatisticsSuccess,
} = slice.actions;

export default slice.reducer;
