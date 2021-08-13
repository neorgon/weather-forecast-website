import React, { useState, useEffect } from 'react';

import requestLocation from './libs/getPosition';
import getCityName from './libs/getCityName';

const App = () => {

	const [position, setPosition] = useState([]);
	const [cityName, setCityName] = useState('');

	const handleClick = () => {
		getCityName(position[1], position[0]).then(city => setCityName(city));
	}

	useEffect(() => {
		const fetchData = async () => {
			const result = await requestLocation();
			setPosition(result);
		}

		fetchData();
	}, []);

	return <>
		<h1>My new app weather</h1>
		<p>Position: { position[0] }, { position[1] }</p>
		<p>City name: { cityName }</p>
		<button onClick={handleClick}>Click here</button>
	</>

}

export default App;
