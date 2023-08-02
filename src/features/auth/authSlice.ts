import { RootState } from "@/app/store";
import { Role } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  tokenExpiration: number | null;
  role: Role | null;
  userId: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  tokenExpiration: null,
  role: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<Pick<AuthState, "tokenExpiration" | "role" | "userId">>
    ) => {
      const { tokenExpiration, role, userId } = action.payload;

      state.isAuthenticated = true;
      state.tokenExpiration = tokenExpiration;
      state.role = role;
      state.userId = userId;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.tokenExpiration = null;
      state.role = null;
      state.userId = null;
    },
  },
});

export const selectAuthStatus = (state: RootState) => state.auth;

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
