import { configureStore, createSlice } from "@reduxjs/toolkit";
import productTmpData from "./_data/productTmpData";
import productCartTmpData from "./_data/productCartTmpData";
import productList from "./_store/productStore";
import productDtl from "./_store/productDtlStore";
import productCartList from "./_store/productCartStore";



//상품 더보기
export let {productListAdd} = productList.actions;
//장바구니 삭제, 수량 변경, 장바구니 담기, 장바구니 상품 삭제
export let { updateCartList, updateCartCount, addCart, deleteCart } =
  productCartList.actions;

export default configureStore({
  reducer: {
    productList: productList.reducer,
    productCartList: productCartList.reducer,
    productDtl: productDtl.reducer,
  },
});