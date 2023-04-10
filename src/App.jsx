import React, { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import SearchBar from "./components/SearchBar";

const API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a72f6d17ce13bd38f1345e900ea0df0c";

const App = () => {
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [currentWeatherObj, setCurrentWeatherObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        });
        const res = await fetch(`${API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
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

    console.log("Latitude is:", lat);
    console.log("Longitude is:", lon);
    fetchCurrentWeather();
  }, [lat, lon]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.fetchWeather(event.target.searchInput.value);
  //   console.log(`Hai scelto ${event.target.searchInput.value}`);
  //   event.target.reset();
  // };

  // const fetchCurrentWeather = async () => {
  //   try {
  //     const res = await fetch(`${API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
  //     if (res.ok) {
  //       const data = await res.json();
  //       setCurrentWeatherObj(data);
  //       console.log(data);
  //     } else {
  //       setIsLoading(false);
  //       setError(true);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     setError(true);
  //     setErrorMsg(error.message);
  //   }
  // };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="d-flex justify-content-center flex-column align-items-center custom-mw-500 bg-custom-darkblue text-custom-white rounded-5 py-5 px-4">
          <h1 className="pfs-14 mb-4">Andrea's Weather App</h1>
          <SearchBar />
          {typeof currentWeatherObj.main != "undefined" ? (
            <CurrentWeather currentWeatherObj={currentWeatherObj} />
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
