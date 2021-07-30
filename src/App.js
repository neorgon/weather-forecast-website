import React, { Component } from 'react';
import Axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const APIurl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng';
    const key = 'AIzaSyDJQ-1MFRpd5pYHua5TSqlNvxGmCezQ9j4';
    const fetchLocation = async (position) => {
      const res = await Axios(`${APIurl}=${position.coords.latitude},${position.coords.longitude}&sensor=true&key=${key}`);
      this.setState({ data: res.data });
    }
    navigator.geolocation.getCurrentPosition(fetchLocation);
  }

  render() {
    return <>
      <h2>Weather App</h2>
      <label>Your city:</label>
      <input name="city" defaultValue={this.state.data ? this.state.data['results'][0]['address_components'][1]['long_name'] : ''} />
    </>
  }

}

export default App;
