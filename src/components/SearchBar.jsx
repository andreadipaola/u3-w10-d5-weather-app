import { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const COORDINATES_API = "http://api.openweathermap.org/geo/1.0/";
const WEATHER_API = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a72f6d17ce13bd38f1345e900ea0df0c";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [currentWeatherObj, setCurrentWeatherObj] = useState(null);
  const [forecastObj, setForecastObj] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchCurrentWeather = async (lat, lon) => {
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

    const fetchForecast = async (lat, lon) => {
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
    try {
      const res = await fetch(`${COORDINATES_API}/direct?q=${query}&appid=${API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        const { lat, lon } = data[0];
        console.log(data[0].lat);
        console.log(data[0].lon);
        fetchCurrentWeather(lat, lon);
        fetchForecast(lat, lon);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setErrorMsg(error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <p>{console.log(currentWeatherObj)}</p>
      <Row>
        <Col className="d-flex justify-content-center flex-column align-items-center custom-mw-500 bg-custom-darkblue text-custom-white rounded-5 py-4 px-4">
          <h1 className="pfs-14 mb-4">Andrea's Weather App</h1>

          <Row className="w-100 mb-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
              <InputGroup className="p-0 ">
                <Form.Control
                  placeholder="Inserisci una città"
                  value={query}
                  onChange={handleChange}
                  className="rounded-5"
                />
              </InputGroup>
            </Form>
          </Row>
          {currentWeatherObj && <CurrentWeather currentWeatherObj={currentWeatherObj} />}
          {forecastObj && <Forecast forecastObj={forecastObj} />}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
