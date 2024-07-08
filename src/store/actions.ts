// store/actions.ts
import { SET_ADDRESS, AddressActionTypes } from "./types";

export const setAddress = (address: string): AddressActionTypes => ({
  type: SET_ADDRESS,
  payload: address,
});
