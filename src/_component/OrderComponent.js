

import { useState } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  Card,
  Image,
  InputGroup,
  Navbar,
  Button,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {setOrder} from '../redux';
import DaumPostcode from "react-daum-postcode";

const OrderComponent = () => {
  let orderChk = true;
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  let seq = searchParams.get("seq");
  let totalOrderPrice = 0;

  //주문상품정보
  let orderProductArr = useSelector((state) => {
    return [state.productOrder];
  });
  if (orderProductArr[0].length>0) {
    orderProductArr = orderProductArr[0];

    //총 주문금액 계산
    orderProductArr.map((val) => {
      totalOrderPrice += (Number(val.productPrice) * Number(val.productcount));
    });
    orderChk = true;
  }else{
    orderChk = false;
  }

  //주문정보
  const [ordrInfo, setOrderInfo] = useState({
    name: "",
    hp: "",
    addr: "",
    addrDtl : "",
    ordrPrice: totalOrderPrice,
    usePoint: "0",
    totalPoint: 300000,
    orderProductArr: orderProductArr,
  });

  const writeFormChangeFnc = (e) => {
    setOrderInfo({
      ...ordrInfo,
      [e.target.name]: e.target.value,
    });
  };
  //포인트 이벤트
  const usePointFnc = () => {
    let uPoint = ordrInfo.usePoint;
    let oPrice = ordrInfo.ordrPrice;
    let tPoint = 300000; //정보를 받아오지 못해 하드코딩

    if (uPoint > 0 && uPoint !== "") {
      if (uPoint > tPoint) {
        alert("보유하신 포인트보다 사용하실 수 없습니다.");
        uPoint = "";
      } else {
        uPoint = uPoint > oPrice ? oPrice : uPoint;
      }
    } else {
      uPoint = ordrInfo.usePoint;
    }

    setOrderInfo({
      ...ordrInfo,
      ordrPrice: oPrice - uPoint,
      usePoint: uPoint,
      totalPoint: tPoint - uPoint,
    });

  };

  //validation
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      //event.stopPropagation();
    }else{

      let today = new Date();
      let year = today.getFullYear();
      let month = ("0" + (today.getMonth() + 1)).slice(-2);
      let day = ("0" + today.getDate()).slice(-2);
      let hours = ("0" + today.getHours()).slice(-2);
      let minutes = ("0" + today.getMinutes()).slice(-2);
      let seconds = ("0" + today.getSeconds()).slice(-2);
      let strOrderNo =
        year +
        month +
        day +
        hours +
        minutes +
        seconds +
        Math.floor(Math.random() * 100);

      if (window.confirm("결제하시겠습니까?")) {
        dispatch(setOrder({ orderNo: strOrderNo, orderInfo: ordrInfo }));
        navigate("../complete");
      }
      event.preventDefault();
    }
    setValidated(true);
  };

  //주소찾기
  const [isAddrPost, setIsAddrPost] = useState(false);
  //주소 선택
  const setAddress = (data) => {
    console.log(data);
    let strAddr = `[${data.zonecode}] ${data.address} ${
      data.buildingName ? '('+data.buildingName+')' : null
    }`;
    setOrderInfo({
      ...ordrInfo,
      addr: strAddr,
    });
    setIsAddrPost(false);
  }

  return (
    <>
      {!orderChk ? (
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Container>
            <Card>
              <Card.Header as="h5">주문상품</Card.Header>
              <Card.Body>
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
                          {Number(it.productPrice) * Number(it.productcount)}
                        </span>
                        원(수량 : {it.productcount})
                      </Card.Text>
                      <Card.Text>사이즈 : {it.productSize}</Card.Text>
                    </div>
                  ))}
              </Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Header as="h5">주문정보</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="3"
                      controlId="validationFormik01"
                      className="mt-3"
                    >
                      <Form.Label>이름</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="이름을 입력 해 주세요."
                        name="name"
                        value={ordrInfo.name}
                        onChange={writeFormChangeFnc}
                        maxLength={30}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        이름을 입력 해 주세요.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="3"
                      controlId="validationFormik02"
                      className="mt-3"
                    >
                      <Form.Label>휴대전화</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="휴대전화를 입력 해 주세요."
                        name="hp"
                        value={ordrInfo.hp}
                        onChange={writeFormChangeFnc}
                        maxLength={15}
                      />
                      <Form.Control.Feedback type="invalid">
                        휴대전화를 입력 해 주세요.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="3"
                      controlId="validationFormik03"
                      className="mt-3"
                    >
                      <Form.Label>주소</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="주소를 입력 해 주세요."
                        name="addr"
                        value={ordrInfo.addr}
                        maxLength={50}
                        required
                        onClick={() => {
                          setOrderInfo({
                            ...ordrInfo,
                            addr: "",
                            addrDtl: "",
                          });
                          setIsAddrPost(true);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        주소를 입력 해 주세요.
                      </Form.Control.Feedback>
                      {isAddrPost ? (
                        <div className="mt-3">
                          <DaumPostcode
                            onComplete={setAddress}
                            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                          />
                        </div>
                      ) : null}
                      <Form.Control
                        type="text"
                        className="mt-3"
                        placeholder="상세 주소를 입력 해 주세요."
                        name="addrDtl"
                        value={ordrInfo.addrDtl}
                        onChange={writeFormChangeFnc}
                        maxLength={100}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        상세 주소를 입력 해 주세요.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Header as="h5">포인트</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Navbar className="bg-body-tertiary">
                      <Container>
                        <Navbar.Brand style={{ fontSize: "15px" }}>
                          보유 포인트
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                          <Navbar.Text>
                            <span style={{ fontWeight: "700" }}>
                              {ordrInfo.totalPoint} P
                            </span>
                          </Navbar.Text>
                        </Navbar.Collapse>
                      </Container>
                    </Navbar>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="사용"
                        name="usePoint"
                        value={ordrInfo.usePoint}
                        onChange={writeFormChangeFnc}
                        onBlur={usePointFnc}
                      />
                      <InputGroup.Text id="basic-addon2">
                        <Button
                          type="button"
                          variant="warning"
                          size="sm"
                          onClick={() => {
                            let uPoint = ordrInfo.usePoint;
                            let oPrice = ordrInfo.ordrPrice;
                            let tPoint = 300000; //정보를 받아오지 못해 하드코딩

                            if (tPoint > oPrice) {
                              uPoint = oPrice;
                            } else {
                              uPoint = tPoint;
                            }
                            setOrderInfo({
                              ...ordrInfo,
                              ordrPrice: oPrice - uPoint,
                              usePoint: uPoint,
                              totalPoint: tPoint - uPoint,
                            });
                          }}
                        >
                          전액사용
                        </Button>
                      </InputGroup.Text>
                    </InputGroup>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>

            <Row>
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand href="#home">총 주문금액</Navbar.Brand>
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                      <span className="order_txt">{ordrInfo.ordrPrice}</span>원
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </Row>

            <div className="d-grid gap-2 mt-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                //disabled={isSubmitting}
              >
                결제하기
              </Button>
            </div>
          </Container>
          <div className="mt-3"></div>
        </Form>
      )}
    </>
  );
}

export default OrderComponent;