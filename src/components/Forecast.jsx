import { Component } from "react";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";
const API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a72f6d17ce13bd38f1345e900ea0df0c";
// const lat = 41.9099856;
// const lon = 12.3990879;

class Forecast extends Component {
  state = {
    weatherObj: null,
    error: false,
    errorMsg: "",
    isLoading: true
  };

  componentDidMount = () => {
    this.fetchWeather();
  };

  fetchWeather = async () => {
    try {
      const response = await fetch(
        `${API_URL}/forecast?lat=${this.props.lat}&lon=${this.props.lon}&appid=${API_KEY}&units=metric`
      );

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
    return (
      <>
        {this.state.error && !this.state.isLoading && (
          <Alert variant="danger">{this.state.errorMsg ? this.state.errorMsg : "Errore nel reperire i dati"}</Alert>
        )}
        {this.state.weatherObj ? (
          <div>
            <div className="d-flex justify-content-between">
              <span>Today</span>
              <span>Tomorrow</span>
              <span>Next 7 Days</span>
            </div>
            <Container>
              <Row className="gy-2">
                {this.state.weatherObj.list.slice(0, 8).map((singleWeather, index) => (
                  <Col key={`Item-1.${index}`}>
                    <Card>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      <Card.Body>
                        <Card.Text>{singleWeather.dt}</Card.Text>
                        <Card.Text>
                          {singleWeather.main.temp}
                          <span></span>&#8451;
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <NewComponent />
        )}
      </>
    );
  }
}

export default Forecast;
