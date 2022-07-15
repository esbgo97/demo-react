import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../products/products.slice";
import { RootState } from "../store";

interface CartProduct extends Product {
  amount: number;
}

const initialState: CartProduct[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartProduct[], action: PayloadAction<Product>) => {
      const productIndex = state.findIndex((pr) => pr.id === action.payload.id);
      if (productIndex !== -1) {
        state[productIndex].amount += 1;
      } else {
        state.push({ ...action.payload, amount: 1 });
      }
      return state;
    },
    removeFromCart: (state: CartProduct[], action: PayloadAction<string>) => {
      const productIndex = state.findIndex((pr) => pr.id === action.payload);
      if (state[productIndex].amount > 1) {
        state[productIndex].amount -= -1;
      } else {
        state.filter((pr) => pr.id !== action.payload);
      }
      return state;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const getCartProductSelector = (state: RootState) => state.cart;
export const getTotalPrice = (state: RootState) =>
  state.cart.reduce((aac, next) => (aac += next.amount + next.price), 0);
export default cartSlice.reducer;
