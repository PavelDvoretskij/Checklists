import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService.js";
import axios from "axios";
import $api from "../http";

export const registration = createAsyncThunk(
  "user/registration",
  async (userData, { rejectWithValue }) => {
    try {
      const { name, email, password } = userData;
      const response = await AuthService.registration(name, email, password);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
    }
  },
);

export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData;
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      return response.data.user.name;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await AuthService.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
});

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (data, { rejectWithValue }) => {
    try {
      const response = await $api.get("/refresh");
      return response.data.user;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    userName: "",
    userId: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.userName = action.payload.name;
      state.userId = action.payload.id;
    });
  },
});
export default todoSlice.reducer;
