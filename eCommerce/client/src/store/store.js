import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice/cartSlice"; // Import the reducer from your slice file
import authReducer from "./authSlice/authSlice"; // Import the reducer from your slice file

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add your reducers here
    auth: authReducer, // New slice
  },
});

export default store;
