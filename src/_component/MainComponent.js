import {
  Button,
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { productListAdd } from "../redux";

let addCnt = 1;

const MainComponent = () => {


  let dispatch = useDispatch();

  let productList = useSelector((state) => {
    return state.productList;
  });
  let list = productList;
  let [isAddBtn, setIsAddBtn] = useState(true);

  const getData = () => {

    addCnt++;
    axios
    .get(`https://codingapple1.github.io/shop/data${addCnt}.json`)
    .then((response) => {
      let result = response.data;
      dispatch(productListAdd(result));
    })
    .catch(() => {
      console.log("서버 통신 Error");
      addCnt--;
    });

    if (addCnt >= 3) {
      setIsAddBtn(false);
    }
  };


  return (
    <>
      <div className="main-bg"/>
      <div>
        <Container className="mt-3">
          <Row>
            {list &&
              list.map((list, index) => (
                <Col key={index}>
                  <a href={`/detail/${list.id}`}>
                    <img src={`/image/shoes${index + 1}.jpg`} width="80%" />
                  </a>
                  <h4>{list.title}</h4>
                  <p>{list.price}</p>
                </Col>
              ))}
          </Row>
          {isAddBtn ? (
            <Button variant="outline-info" onClick={getData}>
              더보기
            </Button>
          ) : null}
        </Container>
      </div>
    </>
  );
}

export default MainComponent;