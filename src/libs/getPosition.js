const requestLocation = () => {
	return new Promise((resolve, reject) => {
		try {
			window.navigator.geolocation.getCurrentPosition((position) => {
				resolve([position.coords.latitude, position.coords.longitude]);
			}, reject);
		} catch (exception) {
			reject(exception);
		}
	});
}

export default requestLocation;
