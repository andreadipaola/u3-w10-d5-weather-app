import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";

const Forecast = ({ forecastObj }) => {
  return (
    <>
      <div>
        <div className="d-flex justify-content-between mb-3"></div>
        <Container>
          <Row className="gy-3">
            {forecastObj.list
              .filter((_, index) => index % 8 === 0)
              .map((singleWeather, index) => (
                <Col
                  key={`Item-1.${index}`}
                  xs={12}
                  className="bg-custom-mediumblue rounded-5 p-4 d-flex justify-content-between align-items-center shadow-sm"
                >
                  <span className="pfs-18 fw-bold mb-2">{moment(singleWeather.dt * 1000).format("ddd, D")}</span>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <img
                      src={`http://openweathermap.org/img/w/${singleWeather.weather[0].icon}.png`}
                      alt="weather icon"
                    />
                    {/* <BsWind className="mb-2 pfs-24 text-custom-yellow" /> */}
                    <span className="text-custom-gray pfs-12">{singleWeather.weather[0].description}</span>
                  </div>
                  <span className="text-custom-gray pfs-18">{Math.floor(singleWeather.main.temp)} &deg;C</span>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
      <div className="mt-5">
        <p>Made with &#10084; in Italy, &copy; 2023 Andrea Di Paola</p>
      </div>
    </>
  );
};

export default Forecast;
