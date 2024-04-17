import { configureStore, createSlice } from "@reduxjs/toolkit";
import productDtlTmpData from "../_data/productDtlTmpData";

//상품 상세 state
let productDtl = createSlice({
  name: "productDtl",
  initialState: productDtlTmpData,
});
export default productDtl;
