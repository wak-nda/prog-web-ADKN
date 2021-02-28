import React, { useEffect, useState } from 'react';
import {
	Map, GeoJSON, LayersControl, TileLayer, Marker, Popup, LayerGroup, Circle, FeatureGroup, Rectangle
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/css/MapComponent.scss';
import PropTypes from 'prop-types';
import { features } from '../data/departments.json';
import { getDeptNumbers } from '../services/loadMapData';

export const MapComponent = (props) => {
	const [departments, setDepartments] = useState([]);

	const mapDepts = features;

	const mapStyle = {
		fillColor: 'white',
		weight: 1,
		color: 'black',
		fillOpacity: 1
	};
	const { location, selection } = props;
	const center = [location.latitude, location.longitude];
	//console.log(departments);
	const rectangle = [
		[51.49, -0.08],
		[51.5, -0.06]
	];

	const onEachCountry = (country, layer) => {
		// console.log(country.properties.CONFIRMEDTEXT);
		layer.options.fillColor = departments.properties.color;
		const name = departments.properties.nom;
		const text = departments.properties.TEXT;
		layer.bindPopup(`${name} ${text}`);
	};

	const formatNumberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	useEffect(() => {
		alert('selection');
		(async () => {
			try {
				const response = await getDeptNumbers();
				const depts = response.data;
				// const l = await getLegendsItemsByType(selection);

				for (let i = 0; i < mapDepts.length; i += 1) {
					const depFromJSON = mapDepts[i];

					const covidDepartment = depts.find(
						// eslint-disable-next-line no-underscore-dangle
						(depFromData) => depFromJSON.properties.code === depFromData._id
					);

					depFromJSON.properties.hosp = 0;
					depFromJSON.properties.rea = 0;
					depFromJSON.properties.rad = 0;
					depFromJSON.properties.dc = 0;
					depFromJSON.properties.TEXT = '0';

					if (covidDepartment != null) {
						const hosp = Number(covidDepartment.sum_hosp);
						const rea = Number(covidDepartment.sum_rea);
						const rad = Number(covidDepartment.sum_rad);
						const dc = Number(covidDepartment.sum_dc);
						//console.log(hosp, rea, rad, dc);
						depFromJSON.properties.hosp = hosp;
						depFromJSON.properties.rea = rea;
						depFromJSON.properties.rad = rad;
						depFromJSON.properties.dc = dc;
						let c = selection;
						if (!Array.isArray(selection)) {
							c = [selection];
						}
						if (c[0] === 'Hospitalisation') {
							depFromJSON.properties.TEXT = formatNumberWithCommas(
								hosp
							);
						}
						if (c[0] === 'Decès') {
							depFromJSON.properties.TEXT = formatNumberWithCommas(
								dc
							);
						}
						if (c[0] === 'Reanimation') {
							depFromJSON.properties.TEXT = formatNumberWithCommas(
								rea
							);
						}
						if (c[0] === 'Retour à domicile') {
							depFromJSON.properties.TEXT = formatNumberWithCommas(
								rad
							);
						}
					}
				}

				// console.log(this.mapDepartments);
				setDepartments(mapDepts);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			} finally {
				//
			}
		})();
		//console.log(location);
	}, [mapDepts, selection]);

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
	// departments: PropTypes.instanceOf(Array).isRequired,
	location: PropTypes.arrayOf(PropTypes.shape({
		longitude: PropTypes.number.isRequired,
		latitude: PropTypes.number.isRequired
	})).isRequired,
	selection: PropTypes.string.isRequired
};
