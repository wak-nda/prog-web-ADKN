import React from 'react';
import { Map, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/css/MapComponent.scss';

export const MapComponent = (countries) => {
	// console.log(countries);
	const mapStyle = {
		fillColor: 'white',
		weight: 1,
		color: 'black',
		fillOpacity: 1
	};

	const onEachCountry = (country, layer) => {
		layer.options.fillColor = country.properties.color;
		const name = country.properties.ADMIN;
		const confirmedText = country.properties.CONFIRMEDTEXT;
		// console.log(name, confirmedText);
		layer.bindPopup(`${name} ${confirmedText}`);
	};

	return (
		<Map style={{ height: '85vh' }} zoom={6} center={[46.632192999999995, 2.578289871490562]}>
			<GeoJSON
				style={mapStyle}
				data={countries.countries}
				onEachFeature={onEachCountry}
			/>
		</Map>
	);
};
