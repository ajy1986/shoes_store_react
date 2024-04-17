
import { Table, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCartList, updateCartCount, deleteCart } from "../redux";

const CartComponent = () => {

  let dispatch = useDispatch();
  let productCartList = useSelector((state) => state.productCartList);
  let list = productCartList;

  return (
    <>
      <Container className="mt-3">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>no</th>
              <th>상품명</th>
              <th>주문수량</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {typeof list === "undefined" || list.length === 0 ? (
              <tr>
                <td colSpan={4}>장바구니에 담긴 상품이 없습니다.</td>
              </tr>
            ) : (
              list.map((it, index) => (
                <tr key={index}>
                  <td>{it.id}</td>
                  <td>{it.name}</td>
                  <td>
                    {it.count}&nbsp;
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        dispatch(
                          updateCartCount({ id: it.id, mode : 'plus'})
                        );
                      }}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        dispatch(updateCartCount({ id: it.id, mode: "minus" }));
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
                          dispatch(deleteCart(it.id));
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
      </Container>
    </>
  );
}

export default CartComponent;