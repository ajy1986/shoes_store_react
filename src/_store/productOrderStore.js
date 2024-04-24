import { createSlice } from "@reduxjs/toolkit";
import addrTempData from "../_data/addrTempData";



//주문상품 state
let productOrder = createSlice({
  name : 'productOrder',
  initialState : [],
  reducers : {
    orderAdd(state, action){
      state = [];
      state = action.payload;
      return state;
    }
  }
});

//주문정보 state
let order = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    setOrder(state, action) {
      state = [];
      state = action.payload;
      return state;
    },
  },
});


//주소 state
let addrState = createSlice({
  name: "addrState",
  initialState: addrTempData,
});

export { productOrder, order, addrState };