import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "@/types/form";

const initialState: FormState = {
  email: '',
  username: '',
  password: '',
  passwordConfirmation: ''
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFields: (state, action: PayloadAction<{ field: keyof FormState; value: string }>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    clearFields: () => initialState
  }
})

export const { updateFields, clearFields } = formSlice.actions;

export default formSlice.reducer
