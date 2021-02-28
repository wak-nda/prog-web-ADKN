import React from 'react';
import {
	Map, GeoJSON, LayersControl, TileLayer, Marker, Popup, LayerGroup, Circle, FeatureGroup, Rectangle
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/css/MapComponent.scss';
import PropTypes from 'prop-types';

export const MapComponent = (props) => {
	const mapStyle = {
		fillColor: 'white',
		weight: 1,
		color: 'black',
		fillOpacity: 0.5
	};
	const { departments, location } = props;
	const center = [location.latitude, location.longitude];
	const rectangle = [
		[51.49, -0.08],
		[51.5, -0.06]
	];

	const onEachCountry = (country, layer) => {
		// console.log(country.properties.CONFIRMEDTEXT);
		layer.options.fillColor = country.properties.color;
		const name = country.properties.nom;
		const text = country.properties.HOSP_TEXT;
		layer.bindPopup(`${name} ${text}`);
	};

	return (
		<Map style={{ height: '85vh' }} zoom={6} center={center}>
			<LayersControl>
				<LayersControl.BaseLayer name="OpenStreetMap.Mapnik" checked>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</LayersControl.BaseLayer>
				{/*<LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">*/}
				{/*	<TileLayer*/}
				{/*		attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'*/}
				{/*		url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"*/}
				{/*	/>*/}
				{/*</LayersControl.BaseLayer>*/}
				<LayersControl.Overlay name="Marker with popup">
					<Marker position={center}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</LayersControl.Overlay>
				<LayersControl.Overlay checked name="Layer group with circles">
					<LayerGroup>
						<Circle
							center={center}
							pathOptions={{ fillColor: 'blue' }}
							radius={200}
						/>
						<Circle
							center={center}
							pathOptions={{ fillColor: 'red' }}
							radius={100}
							stroke={false}
						/>
						<LayerGroup>
							<Circle
								center={[51.51, -0.08]}
								pathOptions={{ color: 'green', fillColor: 'green' }}
								radius={100}
							/>
						</LayerGroup>
					</LayerGroup>
				</LayersControl.Overlay>
				<LayersControl.Overlay name="Feature group">
					<FeatureGroup pathOptions={{ color: 'purple' }}>
						<Popup>Popup in FeatureGroup</Popup>
						<Circle center={[51.51, -0.06]} radius={200} />
						<Rectangle bounds={rectangle} />
					</FeatureGroup>
				</LayersControl.Overlay>
			</LayersControl>
			<GeoJSON
				style={mapStyle}
				data={departments}
				onEachFeature={onEachCountry}
			/>
		</Map>
	);
};

MapComponent.propTypes = {
	departments: PropTypes.instanceOf(Array).isRequired,
	location: PropTypes.arrayOf(PropTypes.shape({
		longitude: PropTypes.number.isRequired,
		latitude: PropTypes.number.isRequired
	})).isRequired
};
