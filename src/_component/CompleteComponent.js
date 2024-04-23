import { Card, Image, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
} from "react-router-dom";

const CompleteComponent = () => {

  let navigate = useNavigate();
  let orderInfo = [];
  let orderProductArr = [];
  let order = useSelector((state) => {
    return state.order;
  });

  if (typeof order === "undefined" || order.length===0) {

  } else {
    orderInfo = order.orderInfo;
    orderProductArr = orderInfo.orderProductArr;
  }

    return (
      <>
        {order.length === 0 ? (
          <div>
            <Alert variant="danger">
              <Alert.Heading>주문 정보를 찾을 수 없습니다.</Alert.Heading>
              <p>
                불편을 드려 죄송합니다.
                <br />
                주문하신 정보를 조회할 수 없습니다.
                <br />
                <Alert.Link href="/">처음부터</Alert.Link> 다시 시도하여 주시기
                바랍니다.
              </p>
              <hr />
              <p className="mb-0">문의전화 : 02) 000-0000</p>
            </Alert>
            <div className="d-grid gap-2 mt-3">
              <Button
                type="button"
                variant="danger"
                size="lg"
                onClick={() => {
                  navigate("/");
                }}
              >
                HOME
              </Button>
            </div>
            <div className="mt-3"></div>
          </div>
        ) : (
          <div style={{ position: "absolute", top: "20%" }}>
            <h1 style={{ textAlign: "center" }}>✨주문이 완료되었습니다.✨</h1>
            <Card className="mt-3">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <footer className="blockquote-footer mt-3">
                    주문번호 :{" "}
                    <cite title="Source Title">
                      <span style={{ color: "red", fontWeight: "600" }}>
                        {order.orderNo}
                      </span>
                    </cite>
                  </footer>
                  <footer className="blockquote-footer mt-3">
                    이름 :{" "}
                    <cite title="Source Title">
                      <span style={{ fontWeight: "700" }}>
                        {orderInfo.name}
                      </span>
                    </cite>
                  </footer>
                  <footer className="blockquote-footer mt-3">
                    연락처 :{" "}
                    <cite title="Source Title">
                      <span style={{ fontWeight: "700" }}>{orderInfo.hp}</span>
                    </cite>
                  </footer>
                  <footer className="blockquote-footer mt-3">
                    주소 :{" "}
                    <cite title="Source Title">
                      <span style={{ fontWeight: "700" }}>
                        {orderInfo.addr} {orderInfo.addrDtl}
                      </span>
                    </cite>
                  </footer>
                  <footer className="blockquote-footer mt-3">상품정보</footer>
                  <Card border="primary" className="mt-3">
                    <Card.Body>
                      <Card.Text>
                        {orderProductArr &&
                          orderProductArr.map((it, index) => (
                            <div className="mt-3">
                              <Card.Title>
                                <Image
                                  src={`/image/${it.productFileName}`}
                                  thumbnail
                                  width="20%"
                                />
                                &nbsp;{it.productTitle}
                              </Card.Title>
                              <Card.Text>
                                금액 :{" "}
                                <span style={{ color: "red" }}>
                                  {Number(it.productPrice) *
                                    Number(it.productcount)}
                                </span>
                                원(수량 : {it.productcount})
                              </Card.Text>
                              <Card.Text>사이즈 : {it.productSize}</Card.Text>
                            </div>
                          ))}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </blockquote>
              </Card.Body>
            </Card>
            <div className="d-grid gap-2 mt-3">
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => {
                  navigate("/");
                }}
              >
                HOME
              </Button>
            </div>
            <div className="mt-3"></div>
          </div>
        )}
      </>
    );
};

export default CompleteComponent;
