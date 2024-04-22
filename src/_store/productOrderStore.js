import { createSlice } from "@reduxjs/toolkit";


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

export { productOrder, order };