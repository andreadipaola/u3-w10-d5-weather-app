import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import SearchBar from "./components/SearchBar";
// import SearchBar from "./components/SearchBar";

function App() {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col col={6} className="mx-auto">
          <SearchBar />
          <CurrentWeather />
          <Forecast />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
