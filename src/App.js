import React, { Component } from 'react';
import Axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

const fetchGeoData = async (params) => {
  const response = await Axios(`${API_URL}${params.api_type}=${params.values}&sensor=true&key=${API_KEY}`)
  return response;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      default_city_name: '',
      address_components: null,
      geometry: null
    };
    this.setAddress = this.setAddress.bind(this);
  }

  componentDidMount() {
    const success = (position) => {
      const results = fetchGeoData({api_type: 'latlng', values: `${position.coords.latitude},${position.coords.longitude}`});
      results.then((res) => {
        this.setState({ default_city_name: res.data['results'][0]['address_components'][1]['long_name'] });
      });
    }
    navigator.geolocation.getCurrentPosition(success);
  }

  setAddress() {
    const results = fetchGeoData({api_type: 'address', values: 'Tiquipaya'});
    results.then((res) => {
      this.setState({address_components: res.data.results[0].address_components});
      console.log(this.state.address_components);
    });
    
  }

  render() {
    return <>
      <h2>Weather App</h2>
      <label>Your city:</label>
      <input name="city" defaultValue={ this.state.default_city_name } />
      <button onClick={ this.setAddress }>Test</button>
    </>
  }

}

export default App;
