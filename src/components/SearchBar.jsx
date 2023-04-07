import { Component } from "react";
import { Alert, Button, Form, InputGroup, Spinner } from "react-bootstrap";
const API_URL = "http://api.openweathermap.org/geo/1.0/";
const API_KEY = "a72f6d17ce13bd38f1345e900ea0df0c";
// const city = "rome";

class SearchBar extends Component {
  state = {
    searchQuery: "",
    weatherObj: null,
    error: false,
    errorMsg: "",
    isLoading: true
  };

  componentDidMount = () => {};

  fetchWeather = async () => {
    try {
      const response = await fetch(`${API_URL}/direct?q=${this.state.searchQuery}&appid=${API_KEY}`);

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
      <>
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              value={this.state.searchQuery}
              onChange={(e) => {
                this.setState({ searchQuery: e.target.value });
                this.fetchWeather();
              }}
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </div>
      </>
    );
  }
}

export default SearchBar;
