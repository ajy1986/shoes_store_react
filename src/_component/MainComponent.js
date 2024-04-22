import {
  Button,
  Navbar,
  Container,
  Nav,
  Row,
  Card,
  Col,
  ButtonGroup,
  Image,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

let addCnt = 1;

const MainComponent = () => {

  let navigate = useNavigate();

  let productList = useSelector((state) => {
    return state.productList;
  });

  let [isAddBtn, setIsAddBtn] = useState(true);
  let [prdtList, setPrdtList] = useState([]);

  useEffect(()=>{
    addCnt = 1;
    if (productList.length > 0) {
      setPrdtList(productList.filter((tmp) => tmp.page === addCnt));
    } else {
      setIsAddBtn(false);
    }
  },[])

  return (
    <>
      <div>
        <Container className="mt-3">
          <Row>
            {prdtList &&
              prdtList.map((list, index) => (
                <Card className="mt-3" key={index}>
                  <a
                    href="javascript:"
                    onClick={() => {
                      navigate(`/detail?seq=${list.seq}`);
                    }}
                  >
                    <div style={{ width: "250px", margin: "auto" }}>
                      <Card.Img variant="top" src={`/image/${list.fileName}`} />
                    </div>
                  </a>
                  <Card.Body style={{ margin: "auto" }}>
                    <Card.Title>{list.title}</Card.Title>
                    <Card.Text>
                      <span style={{ fontWeight: "700", color: "red" }}>
                        {list.price}
                      </span>
                      원
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
          </Row>
          <br />
          {isAddBtn ? (
            <div class="d-flex justify-content-center md-3">
              <Button variant="outline-info" onClick={()=>{
                addCnt++;
                setPrdtList((prdtList) => [
                  ...prdtList,
                  ...productList.filter((tmp) => tmp.page === addCnt),
                ]);
                if (productList.filter((tmp) => tmp.page === addCnt + 1).length ===0) {
                  setIsAddBtn(false);
                }
              }}>
                더보기
              </Button>
            </div>
          ) : null}
          <div className="mt-3"></div>
        </Container>
      </div>
    </>
  );
}

export default MainComponent;