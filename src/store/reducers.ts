import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressState {
  address: string;
}

const initialState: AddressState = {
  address: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export const addressReducer = addressSlice.reducer;
