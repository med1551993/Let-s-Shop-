import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import ProductReducer from "./productSlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: ProductReducer,
    modal: modalReducer,
    cart: cartReducer,
  },
});
export default store;
