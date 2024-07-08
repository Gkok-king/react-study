import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "./reducers";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    address: addressReducer,
  },
});

interface ReduxProviderProps {
  children: ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
