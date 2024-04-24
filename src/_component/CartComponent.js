
import { Table, Container, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartList,
  updateCartCount,
  deleteCart,
  orderAdd,
} from "../redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CartComponent = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let productCartList = useSelector((state) => state.productCartList);

  let list = productCartList;

  //선택체크박스
  const [checkItems, setCheckItems] = useState([]);

  //선택 주문
  const setArrOrder = () => {
    if (checkItems.length === 0) {
      alert("주문하실 상품을 선택 해 주세요.");
    } else {
      let cartOrderList = [];
      let ordrProductList = [];

      ordrProductList = list.filter((tmp) =>
        checkItems.includes(tmp.productSeq)
      );
      ordrProductList.forEach((e) => {
        let tmpObj = {
          productSeq: e.productSeq,
          productFileName: e.fileName,
          productTitle: e.title,
          productPrice: e.price,
          productcount: e.count,
          productSize: e.size,
        };
        cartOrderList.push(tmpObj);
      });
      dispatch(orderAdd(cartOrderList));
      setCheckItems([]);
      navigate("../order");
    }
  };


  // 체크박스 단일 선택
  const handleSingleCheck = (checked, productSeq) => {
    if (checked) {
      setCheckItems((prev) => [...prev, productSeq]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== productSeq));
    }
  };

  //전체선택 이벤트
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      list.forEach((el) => idArray.push(el.productSeq));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                {" "}
                <Form.Check
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={checkItems.length === list.length ? true : false}
                />
              </th>
              <th>상품명</th>
              <th>주문수량</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {typeof list === "undefined" || list.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <p style={{ textAlign: "center" }}>
                    장바구니에 담긴 상품이 없습니다.
                  </p>
                </td>
              </tr>
            ) : (
              list.map((it, index) => (
                <tr key={index}>
                  <td>
                    <Form.Group className="mb-3">
                      <Form.Check
                        name="productSeq"
                        onChange={(e) =>
                          handleSingleCheck(e.target.checked, it.productSeq)
                        }
                        checked={
                          checkItems.includes(it.productSeq) ? true : false
                        }
                      />
                    </Form.Group>
                  </td>
                  <td>
                    {it.title}
                    <br />
                    사이즈 : {it.size}
                  </td>
                  <td>
                    {it.count}&nbsp;
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        dispatch(
                          updateCartCount({
                            cartSeq: it.cartSeq,
                            mode: "plus",
                          })
                        );
                      }}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        dispatch(
                          updateCartCount({
                            cartSeq: it.cartSeq,
                            mode: "minus",
                          })
                        );
                      }}
                    >
                      -
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        dispatch(deleteCart(it.cartSeq));
                      }}
                    >
                      삭제
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <div>
          <Button variant="success" size="sm" onClick={setArrOrder}>
            선택 주문
          </Button>
        </div>
      </Container>
    </>
  );
}

export default CartComponent;