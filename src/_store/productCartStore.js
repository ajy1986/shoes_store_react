import { configureStore, createSlice } from "@reduxjs/toolkit";


//장바구니 state
let productCartList = createSlice({
  name: "productCartList",
  initialState: [],
  reducers: {
    //장바구니 수량 변경
    updateCartCount(state, action) {
      let setIndex = 0;

      state.forEach((e, index) => {
        if (e.cartSeq === action.payload.cartSeq) {
          setIndex = index;
        }
      });

      if (action.payload.mode === "plus") {
        state[setIndex].count += 1;
      } else if (action.payload.mode === "minus" && state[setIndex].count > 1) {
        state[setIndex].count -= 1;
      }
    },
    //장바구니 담기
    addCart(state, action) {
      let dtl = action.payload;

      if (state.length===0){
        state.push(dtl);
      }else{
        let overLapArr = state.filter((e) => e.productSeq === dtl.productSeq && e.size === dtl.size);
        if(overLapArr.length>0){
          //담긴 상품이면 주문수량 +1
          state.forEach((e, index) => {
            if (e.productSeq === dtl.productSeq && e.size === dtl.size) {
              state[index].count += dtl.count;
            }
          });
        }else{
          state.push(dtl);
        }
      }
    },
    //장바구니 삭제
    deleteCart(state, action) {
      if (state.length === 1) {
        return [];
      } else {
        let newCartList = state.filter((e, index) => {
          return e.cartSeq !== parseInt(action.payload);
        });
        return newCartList;
      }
    },
  },
});
export default productCartList;
