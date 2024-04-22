import { configureStore, createSlice } from "@reduxjs/toolkit";
import productTempData from "../_data/productTempData";

//상품 state
let productList = createSlice({
  name: "productList",
  initialState: productTempData,
});


export default productList;
