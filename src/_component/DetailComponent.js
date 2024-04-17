import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux";

const DetailComponent = () => {

  let [isTab, setIsTab] = useState(0);
  let dispatch = useDispatch();

  let list = useSelector((state)=>{
    return state.productList;
  });
  let dtlData = [];
  let {id} = useParams();

  if (list.length>0){
    list.forEach(e => {
      let strId = e.id;
      if (strId.toString() === id) {
        dtlData = e;
      }
    });
  }

  useEffect(() => {
    //최근 본 상품 sessionStorage 담기
    let getSessionData = sessionStorage.getItem("viewProduct");
    if (getSessionData === null) {
      sessionStorage.setItem("viewProduct", JSON.stringify([dtlData]));
    } else {
      let sessionData = JSON.parse(getSessionData);
      let filterData = sessionData.filter((e,value)=>{
        if(parseInt(e.id)!==parseInt(dtlData.id)){
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
                <img src={`/image/shoes${Number(id) + 1}.jpg`} width="80%" />
              </div>
              <div className="col-md-6">
                <h4 className="pt-5">{dtlData.title}</h4>
                <p>{dtlData.content}</p>
                <p>{dtlData.price}원</p>
                <p>
                  <button className="btn btn-info" onClick={()=>{
                    dispatch(
                      addCart({ id: dtlData.id, name: dtlData.title, count: 1 })
                    );
                    // if(window.confirm("장바구니에 담겼습니다.장바구니 페이지로 이동하시겠습니까?")){
                    //   window.location.href='/cart';
                    // }
                  }}>장바구니</button>&nbsp;
                  {/* <button className="btn btn-danger">주문하기</button> */}
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
                  Tab content for Home
                </Tab>
                <Tab
                  eventKey="link1"
                  title="상세정보"
                  onClick={() => {
                    setIsTab(1);
                  }}
                >
                  Tab content for Profile
                </Tab>
                <Tab
                  eventKey="link2"
                  title="리뷰"
                  onClick={() => {
                    setIsTab(2);
                  }}
                >
                  Tab content for Loooonger Tab
                </Tab>
              </Tabs>
            </div>
          </Container>
        )}
      </>
    );
}

export default DetailComponent;