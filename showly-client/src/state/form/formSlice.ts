import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthFormState } from "@/types/auth";

const initialState: AuthFormState = {
  signUp: {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  },
  signIn: {
    email: "",
    password: "",
  },
};

const authFormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateSignUpFields: (
      state,
      action: PayloadAction<{ field: keyof AuthFormState["signUp"]; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.signUp[field] = value;
    },
    updateSignInFields: (
      state,
      action: PayloadAction<{ field: keyof AuthFormState["signIn"]; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.signIn[field] = value;
    },
    clearFields: () => initialState,
  },
});

export const { updateSignUpFields, updateSignInFields, clearFields } = authFormSlice.actions;

export default authFormSlice.reducer;
