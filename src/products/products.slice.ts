import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction
} from "@reduxjs/toolkit";

import validateProduct from "../services/products.";
import { RootState } from "../store";

export interface Product {
  title: string;
  price: number;
  id: string;
}

export enum ValidationState {
  Fulfilled,
  Pending,
  Reject,
}

export interface ProductsSliceState {
  validationState?: ValidationState;
  errorMessage?: string;
}

export const addProductAsync = createAsyncThunk(
  "products/addNewProduct",
  async (initialP: Product) => {
    const product = await validateProduct(initialP);
    return product;
  }
);

const initialProducts: Product[] = [
  { title: "Producto 1", price: 50.5, id: "p1" },
  { title: "Producto 2", price: 66.5, id: "p2" },
  { title: "Producto 3", price: 756.5, id: "p3" },
];

const productAdapter = createEntityAdapter<Product>();

const initialState = productAdapter.getInitialState<ProductsSliceState>({
  errorMessage: undefined,
  validationState: undefined,
});

const filledInitialState = productAdapter.upsertMany(
  initialState,
  initialProducts
);

const productsSlice = createSlice({
  name: "products",
  initialState: filledInitialState,
  reducers: {
    addProduct: (
      state: EntityState<Product> & ProductsSliceState,
      action: PayloadAction<Product>
    ) => {
      productAdapter.upsertOne(state, action.payload);
    },
    removeProduct: (
      state: EntityState<Product> & ProductsSliceState,
      action: PayloadAction<string>
    ) => {
      productAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.validationState = ValidationState.Fulfilled;
      state.errorMessage = "";
      return state;
    });
    builder.addCase(addProductAsync.rejected, (state, action) => {
      state.validationState = ValidationState.Reject;
      state.errorMessage = action.error.message;
      return state;
    });
    builder.addCase(addProductAsync.pending, (state, action) => {
      state.validationState = ValidationState.Fulfilled;
      state.errorMessage = action.payload;
      return state;
    });
  },
});
export const { addProduct, removeProduct } = productsSlice.actions;
export const getProductsSelector = (state: RootState) =>
  state.products.entities;
export const getErrorMessageSelector = (state: RootState) =>
  state.products.errorMessage;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductsById,
  selectTotal: selectTotalProducts,
} = productAdapter.getSelectors<RootState>(state=>state.products);

export default productsSlice.reducer;
