import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistor } from "../store";

interface AuthState {
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
      persistor.purge();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
