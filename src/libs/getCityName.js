import Axios from 'axios';

import { mapHost } from '../config';

const MAPBOX_TOKEN = process.env.REACT_APP_API_MAPBOX_TOKEN;

const getCityName = async (longitude, latitude) => {
	const result = await Axios(`${mapHost}${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`);
	return result.data.features[0].place_name;
}

export default getCityName;
