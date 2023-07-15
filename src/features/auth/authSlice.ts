import { User } from "@/api/auth/auth.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
