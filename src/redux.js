import { configureStore, createSlice } from "@reduxjs/toolkit";
import productList from "./_store/productStore";
import productCartList from "./_store/productCartStore";
import { productOrder, order, addrState } from "./_store/productOrderStore";

//장바구니 삭제, 수량 변경, 장바구니 담기, 장바구니 상품 삭제
export let { updateCartList, updateCartCount, addCart, deleteCart } = productCartList.actions;
//주문상품담기
export let {orderAdd} = productOrder.actions;

//주문완료
export let { setOrder } = order.actions;

export default configureStore({
  reducer: {
    productList: productList.reducer,
    productCartList: productCartList.reducer,
    productOrder: productOrder.reducer,
    order: order.reducer,
    addrState: addrState.reducer,
  },
});