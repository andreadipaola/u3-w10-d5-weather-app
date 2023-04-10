import { Component } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
const API_URL = "http://api.openweathermap.org/geo/1.0/";
const API_KEY = "a72f6d17ce13bd38f1345e900ea0df0c";

class SearchBar extends Component {
  state = {
    weatherObj: null,
    error: false,
    errorMsg: "",
    isLoading: true
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("you pressed enter key");
      this.fetchWeather(event.target.value);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchWeather(event.target.searchInput.value);
    event.target.reset();
  };

  fetchWeather = async (value) => {
    try {
      const response = await fetch(`${API_URL}/direct?q=${value}&appid=${API_KEY}`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.setState({ weatherObj: data, isLoading: false });
      } else {
        this.setState({ error: true, isLoading: false });
      }
    } catch (error) {
      this.setState({ error: true, errorMsg: error.message, isLoading: false });
    }
  };

  render() {
    return (
      <Row className="w-100 mb-4 shadow-sm">
        <InputGroup className="p-0 ">
          <Form.Control
            placeholder="Inserisci una città"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            className="rounded-5"
          />
        </InputGroup>
      </Row>
    );
  }
}

export default SearchBar;
