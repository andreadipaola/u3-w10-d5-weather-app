import { Card, Col, Row } from "react-bootstrap";
import moment from "moment";
import { GrLocation, GrRefresh } from "react-icons/gr";
import { BsGeoAltFill, BsArrowRepeat, BsWind, BsDroplet, BsEye } from "react-icons/bs";

const refresh = () => {
  window.location.reload();
};
const CurrentWeather = ({ currentWeatherObj }) => (
  <>
    <Row className="bg-custom-mediumblue rounded-5 w-100 p-3 mb-4 shadow-sm">
      <div className="d-flex justify-content-end">
        <span
          style={{ cursor: "pointer" }}
          className="rounded-circle wd-25 ht-25 bg-custom-yellow d-flex justify-content-center align-items-center mb-3 d-block"
          onClick={refresh}
        >
          <BsArrowRepeat className="text-custom-darkblue" />
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="pfs-20">Today</span>
        <span className="pfs-12 text-custom-gray">{moment().format("ddd, D MMM")}</span>
      </div>
      <div className="d-flex justify-content-between">
        <div className="mb-3">
          <span style={{ fontSize: "96px", verticalAlign: "text-top" }} className="fw-bold me-1">
            {Math.floor(currentWeatherObj.main.temp)}
          </span>
          <span style={{ fontSize: "32px", verticalAlign: "text-top" }} className="fw-bold text-custom-yellow">
            &deg;C
          </span>
        </div>
        <div>{currentWeatherObj.weather[0].description}</div>
      </div>
      <div className="d-flex align-items-center">
        <BsGeoAltFill className="me-1 text-custom-yellow" color="red" />
        <span>
          {currentWeatherObj.name}, {currentWeatherObj.sys.country}
        </span>
      </div>
    </Row>
    <Row className="d-flex w-100 gap-3">
      <Col className="bg-custom-mediumblue rounded-5 w-100 p-4 d-flex flex-column justify-content-center align-items-center shadow-sm">
        <BsWind className="mb-2 pfs-24 text-custom-yellow" />
        <span className="pfs-18 fw-bold mb-2">{Math.floor(currentWeatherObj.wind.speed)} km/h</span>
        <span className="text-custom-gray pfs-12">Wind</span>
      </Col>
      <Col className="bg-custom-mediumblue rounded-5 w-100 p-4 d-flex flex-column justify-content-center align-items-center shadow-sm">
        <BsDroplet className="mb-2 pfs-24 text-custom-yellow" />
        <span className="pfs-18 fw-bold mb-2">{currentWeatherObj.main.humidity} %</span>
        <span className="text-custom-gray pfs-12">Humidity</span>
      </Col>
      <Col className="bg-custom-mediumblue rounded-5 w-100 p-4 d-flex flex-column justify-content-center align-items-center shadow-sm">
        <BsEye className="mb-2 pfs-24 text-custom-yellow" />
        <span className="pfs-18 fw-bold mb-2">{currentWeatherObj.visibility}</span>
        <span className="text-custom-gray pfs-12">Visibility</span>
      </Col>
    </Row>
  </>
);

export default CurrentWeather;
