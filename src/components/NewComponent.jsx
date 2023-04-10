import { Component } from "react";
import { Alert, Card, Spinner } from "react-bootstrap";

const API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a72f6d17ce13bd38f1345e900ea0df0c";
// const lat = 41.9099856;
// const lon = 12.3990879;

class CurrentWeather extends Component {
  state = {
    weatherObj: null,
    error: false,
    errorMsg: "",
    isLoading: true
  };

  componentDidMount = () => {
    this.fetchWeather(this.props.lat, this.props.lon);
  };

  fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(`${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        this.setState({ weatherObj: data, isLoading: false });
      } else {
        this.setState({ error: true, isLoading: false });
      }
    } catch (error) {
      this.setState({ error: true, errorMsg: error.message, isLoading: false });
    }
  };

  render() {
    // console.log(this.state.weatherObj);
    return (
      <>
        {/* <Container>
          {this.state.isLoading && !this.state.error && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Container> */}
        {this.state.error && !this.state.isLoading && (
          <Alert variant="danger">
            {this.state.errorMsg ? this.state.errorMsg : `Errore nel reperire i dati ${this.props.lat}`}
          </Alert>
        )}

        <div>
          {this.state.weatherObj & this.props.lat & this.props.lon ? (
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <h2>Today</h2>
                <span>{this.state.weatherObj.dt}</span>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <span>{this.state.weatherObj.main.temp}</span>
                  <span>&#8451;</span>
                  <span>{this.state.weatherObj.weather[0].main}</span>
                </div>

                <span>{/* "https://openweathermap.org/img/w/{this.state.weatherObj.weather[0].icon}.png" */}</span>
              </div>
              <div>
                <span>Location Icon</span>
                <span>{this.state.weatherObj.name}</span>
              </div>
              <div className="d-flex">
                <Card>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Text>{this.state.weatherObj.wind.speed}km/h</Card.Text>
                    <Card.Text>Wind</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Text>{this.state.weatherObj.main.humidity}%</Card.Text>
                    <Card.Text>Humidity</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Text>{this.state.weatherObj.main.humidity}bar</Card.Text>
                    <Card.Text>Pressure</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
      </>
    );
  }
}

export default CurrentWeather;
