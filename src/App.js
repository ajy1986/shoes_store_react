import './App.css';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Spinner,
  Offcanvas,
  Card,
  Carousel,
  Image,
} from "react-bootstrap";
import MainComponent from "./_component/MainComponent";
import DetailComponent from "./_component/DetailComponent";
import CartComponent from "./_component/CartComponent";
import OrderComponent from "./_component/OrderComponent";
import CompleteComponent from "./_component/CompleteComponent";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import { useState } from "react";



function App() {

  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let getSessionData = sessionStorage.getItem("viewProduct");
  const sessionData = JSON.parse(getSessionData);

  return (
    <>
      <Container fluid="md" className="mt-3 bg">
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="/" className='textBold'>Shoe Store(feat.React)</Navbar.Brand>
          </Container>
        </Navbar>
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Nav className="me-auto">
              <Nav.Link  className='textBold' onClick={() => navigate("/")}>Home</Nav.Link>
              <Nav.Link  className='textBold' onClick={() => navigate("/cart")}>Cart</Nav.Link>
              <Nav.Link  className='textBold' onClick={handleShow}>
                <Button variant="outline-warning" size="sm" className='textBold'>
                  Recent Products
                </Button>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="*"
            element={
              <div>
                <h4>404 Not Page</h4>
              </div>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Carousel>
                  <Carousel.Item>
                    <div className="main-bg" />
                    <Carousel.Caption>
                      <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="main-bg2" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="main-bg3" />
                  </Carousel.Item>
                </Carousel>
                <MainComponent />
              </>
            }
          />
          <Route
            path="/detail"
            element={
              <>
                <DetailComponent />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <CartComponent />
              </>
            }
          />
          <Route
            path="/order"
            element={
              <>
                <OrderComponent />
              </>
            }
          />
          <Route
            path="/complete"
            element={
              <>
                <CompleteComponent />
              </>
            }
          />
        </Routes>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>최근 본 상품</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {sessionData && sessionData.length > 0
              ? sessionData.map((it, index) => (
                  <>
                    <Card
                      border="success"
                      style={{ width: "20rem" }}
                      key={index}
                    >
                      <Card.Header>{it.title}</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <Nav.Link
                            onClick={() => {
                              handleClose(false);
                              navigate(`/detail?seq=${it.seq}`);
                            }}
                          >
                            <Image src={`/image/${it.fileName}`} width="60%" />
                          </Nav.Link>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <br />
                  </>
                ))
              : null}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </>
  );
}

export default App;
