import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Tabs,
  Tab,
  Container,
  ListGroup,
  Form,
  InputGroup,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCart, orderAdd } from "../redux";

const DetailComponent = () => {

  let [isTab, setIsTab] = useState(0);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let list = useSelector((state)=>{
    return state.productList;
  });
  let productCartList = useSelector((state) => state.productCartList);
  let dtlData = [];

  let [searchParams, setSearchParams] = useSearchParams();
  let seq = searchParams.get("seq");


  if (list.length>0){
    list.forEach(e => {
      let strId = e.seq;
      if (strId.toString() === seq) {
        dtlData = e;
      }
    });
  };

  //수량
  let [prdtCnt, setPrdtCnt] = useState(1);
  //사이즈
  let [prdtSize, setPrdtSize] = useState('');

  useEffect(() => {
    //최근 본 상품 sessionStorage 담기
    let getSessionData = sessionStorage.getItem("viewProduct");
    if (getSessionData === null) {
      sessionStorage.setItem("viewProduct", JSON.stringify([dtlData]));
    } else {
      let sessionData = JSON.parse(getSessionData);
      let filterData = sessionData.filter((e,value)=>{
        if(parseInt(e.seq)!==parseInt(dtlData.seq)){
          return e;
        }
      });
      if (filterData.length>0){
        filterData.push(dtlData);
        sessionStorage.removeItem("viewProduct");
        sessionStorage.setItem("viewProduct", JSON.stringify(filterData));
      }
    }
  }, []);

    return (
      <>
        {dtlData && dtlData.length === 0 ? (
          <p>찾는 상품이 없습니다.</p>
        ) : (
          <Container className="mt-3">
            <div className="row">
              <div className="col-md-6">
                <img src={`/image/${dtlData.fileName}`} width="80%" />
              </div>
              <div className="col-md-6">
                <h4 className="pt-5">{dtlData.title}</h4>
                <p>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                      <span style={{ fontWeight: "700", color: "red" }}>
                        {dtlData.price}
                      </span>
                      원
                    </InputGroup.Text>
                    <Form.Select
                      size="sm"
                      name="size"
                      onChange={(e) => {
                        setPrdtSize(e.target.value);
                      }}
                    >
                      <option value="">사이즈 선택</option>
                      <option value="230">230</option>
                      <option value="240">240</option>
                      <option value="250">250</option>
                      <option value="260">260</option>
                      <option value="270">270</option>
                      <option value="280">280</option>
                      <option value="290">290</option>
                    </Form.Select>
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Text>수량</InputGroup.Text>
                    <Form.Control disabled value={prdtCnt} />
                    <InputGroup.Text
                      onClick={() => {
                        setPrdtCnt(prdtCnt + 1);
                      }}
                    >
                      +
                    </InputGroup.Text>
                    <InputGroup.Text
                      onClick={() => {
                        setPrdtCnt(prdtCnt - 1);
                      }}
                    >
                      -
                    </InputGroup.Text>
                  </InputGroup>
                </p>
                <p>
                  <button
                    size="sm"
                    className="btn btn-info"
                    onClick={() => {
                      if (prdtSize === "") {
                        alert("사이즈를 선택 해 주세요.");
                        return false;
                      }
                      dispatch(
                        addCart({
                          cartSeq: productCartList.length + 1,
                          fileName : dtlData.fileName,
                          productSeq: dtlData.seq,
                          title: dtlData.title,
                          count: prdtCnt,
                          price: dtlData.price,
                          size: prdtSize,
                        })
                      );
                      if (
                        window.confirm(
                          "장바구니에 담겼습니다.장바구니 페이지로 이동하시겠습니까?"
                        )
                      ) {
                        navigate("../cart");
                      }
                    }}
                  >
                    장바구니
                  </button>
                  &nbsp;
                  <button
                    size="sm"
                    className="btn btn-success"
                    onClick={() => {
                      if (prdtSize === "") {
                        alert("사이즈를 선택 해 주세요.");
                        return false;
                      }
                      let orderList = [];
                      let tmpObj = {
                        productSeq: dtlData.seq,
                        productFileName: dtlData.fileName,
                        productTitle: dtlData.title,
                        productPrice: dtlData.price,
                        productcount: prdtCnt,
                        productSize: prdtSize,
                      };
                      orderList.push(tmpObj);
                      dispatch(orderAdd(orderList));
                      navigate(`../order?seq=${dtlData.seq}`);
                    }}
                  >
                    주문하기
                  </button>
                </p>
              </div>
            </div>

            <div className="mb-3 mt-3">
              <Tabs
                defaultActiveKey={`link${isTab}`}
                id="fill-tab-example"
                className="mb-3"
                fill
              >
                <Tab
                  eventKey="link0"
                  title="기본정보"
                  onClick={() => {
                    setIsTab(0);
                  }}
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>{dtlData.info}</Card.Title>
                      <Card.Text>{dtlData.dtlInfo}</Card.Text>
                    </Card.Body>
                  </Card>
                </Tab>
                <Tab
                  eventKey="link2"
                  title="리뷰"
                  onClick={() => {
                    setIsTab(2);
                  }}
                >
                  <ListGroup>
                    {dtlData.review &&
                      dtlData.review.map((list, index) => (
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{list.title}</div>
                            {list.content}
                          </div>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Tab>
              </Tabs>
            </div>
          </Container>
        )}
      </>
    );
}

export default DetailComponent;