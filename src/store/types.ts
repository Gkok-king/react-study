// store/types.ts
export const SET_ADDRESS = "SET_ADDRESS";

export interface AddressState {
  address: string;
}

interface SetAddressAction {
  type: typeof SET_ADDRESS;
  payload: string;
}

export type AddressActionTypes = SetAddressAction;
