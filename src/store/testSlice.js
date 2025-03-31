import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiJson from "../testApi/api.json";
export const fetchTest = createAsyncThunk(
  `test/fetchTest`,
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(apiJson, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  test: [],
  testStatus: null,
  testError: null,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    clearTests(state) {
      state.test = [];
      state.testStatus = null;
      state.testError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTest.pending, (state) => {
        state.testStatus = "loading";
        state.testError = null;
      })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.testStatus = "resolved";
        state.test = action.payload;
        state.testError = null;
      })
      .addCase(fetchTest.rejected, (state, action) => {
        state.testStatus = "rejected";
        state.testError = action.payload;
      });
  },
});

export const { clearTests } = testSlice.actions;

export const testReducer = testSlice.reducer;
