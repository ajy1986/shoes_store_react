import { configureStore, createSlice } from "@reduxjs/toolkit";
import productCartTmpData from "../_data/productCartTmpData";

//장바구니 state
let productCartList = createSlice({
  name: "productCartList",
  initialState: productCartTmpData,
  reducers: {
    //장바구니 삭제
    updateCartList(state, action) {},
    //장바구니 수량 변경
    updateCartCount(state, action) {
      console.log(action);
      if (action.payload.mode === "plus") {
        state[action.payload.id].count += 1;
      } else if (
        action.payload.mode === "minus" &&
        state[action.payload.id].count > 1
      ) {
        state[action.payload.id].count -= 1;
      }
    },
    //장바구니 담기
    addCart(state, action) {
      let dtl = action.payload;

      let indexState = state.findIndex((e) => {
        return e.id === dtl.id;
      });
      //담긴 상품이면 주문수량 +1
      if (indexState > -1) {
        state[indexState].count += 1;
      } else {
        state.push(dtl);
      }
    },
    //장바구니 삭제
    deleteCart(state, action){

      if(state.length===1){
        return [];
      }else{
        let newCartList = state.filter((e, index) => {
          return index !== parseInt(action.payload);
        });
        return newCartList;
      }
    }
  },
});

export default productCartList;
