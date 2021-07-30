import React, { Component } from 'react';
import Axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      long_name: null
    };
  }

  componentDidMount() {
    const fetchLocation = async (position) => {
      const res = await Axios(`${API_URL}=${position.coords.latitude},${position.coords.longitude}&sensor=true&key=${API_KEY}`);
      this.setState({ data: res.data['results'] });
      this.setState({ long_name: this.state.data[0]['address_components'][1]['long_name'] });
    }
    navigator.geolocation.getCurrentPosition(fetchLocation);
  }

  render() {
    return <>
      <h2>Weather App</h2>
      <label>Your city:</label>
      <input name="city" defaultValue={this.state.long_name ? this.state.long_name : ''} />
    </>
  }

}

export default App;
