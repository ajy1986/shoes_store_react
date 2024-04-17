import { configureStore, createSlice } from "@reduxjs/toolkit";
import productTmpData from "../_data/productTmpData";

//상품 state
let productList = createSlice({
  name: "productList",
  initialState: productTmpData,
  reducers: {
    //더보기
    productListAdd(state, action) {
      let addList = action.payload;
      addList.forEach((e) => {
        state.push({
          id: e.id,
          title: e.title,
          content: e.content,
          price: e.price,
        });
      });
    },
  },
});


export default productList;
