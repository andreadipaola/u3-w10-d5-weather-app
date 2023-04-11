import React, { useEffect, useState } from "react";
// import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/SearchBar";
import { Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";

const COORDINATES_API = "http://api.openweathermap.org/geo/1.0";
const WEATHER_API = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a72f6d17ce13bd38f1345e900ea0df0c";

const App = () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  });
  const [searchInput, setSearchInput] = useState("");
  // const [coordinatesObj, setCoordinatesObj] = useState([]);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [currentWeatherObj, setCurrentWeatherObj] = useState(null);
  const [forecastObj, setForecastObj] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCoordinates(searchInput);
    event.target.reset();
  };

  const fetchCoordinates = async (value) => {
    try {
      const res = await fetch(`${COORDINATES_API}/direct?q=${value}&appid=${API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setLat(data[0].lat);
        setLon(data[0].lon);
        console.log(lat);
        console.log(lon);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const res = await fetch(`${WEATHER_API}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (res.ok) {
          const data = await res.json();
          setCurrentWeatherObj(data);
          console.log(data);
        } else {
          setIsLoading(false);
          setError(true);
        }
      } catch (error) {
        setIsLoading(false);
        setError(true);
        setErrorMsg(error.message);
      }
    };

    const fetchForecast = async () => {
      try {
        const res = await fetch(`${WEATHER_API}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (res.ok) {
          const data = await res.json();
          setForecastObj(data);
          console.log(data);
        } else {
          setIsLoading(false);
          setError(true);
        }
      } catch (error) {
        setIsLoading(false);
        setError(true);
        setErrorMsg(error.message);
      }
    };
    if ((lat, lon)) {
      fetchCurrentWeather(lat, lon);
      fetchForecast(lat, lon);
    }
  }, [lat, lon]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="d-flex justify-content-center flex-column align-items-center custom-mw-500 bg-custom-darkblue text-custom-white rounded-5 py-5 px-4">
          <h1 className="pfs-14 mb-4">Andrea's Weather App</h1>
          <Row className="w-100 mb-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
              <InputGroup className="p-0 ">
                <Form.Control
                  placeholder="Inserisci una città"
                  value={searchInput}
                  onChange={handleChange}
                  className="rounded-5"
                />
              </InputGroup>
            </Form>
          </Row>
          {currentWeatherObj ? (
            <>
              <CurrentWeather data={currentWeatherObj} />
              <Forecast data={forecastObj} />
            </>
          ) : (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {forecastObj ? (
            <Forecast data={forecastObj} />
          ) : (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
