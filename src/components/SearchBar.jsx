import { useState } from "react";
import { Form, InputGroup, Row } from "react-bootstrap";
const API_URL = "http://api.openweathermap.org/geo/1.0/";
const API_KEY = "a72f6d17ce13bd38f1345e900ea0df0c";

const SearchBar = ({ fetchWeatherFunction }) => {
  const [searchInput, setSearchInput] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // navigator.geolocation.getCurrentPosition(function (position) {
  //   setLat(position.coords.latitude);
  //   setLon(position.coords.longitude);
  // });

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    fetchWeatherFunction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCoordinates();
    event.target.reset();
  };

  const fetchCoordinates = async () => {
    try {
      const res = await fetch(`${API_URL}/direct?q=${searchInput}&appid=${API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setErrorMsg(error.message);
    }
  };

  return (
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
  );
};

export default SearchBar;
