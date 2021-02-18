import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

export const Home = () => (
	<Container>
		<Row>
			<Col>
				<h1>Home</h1>
				<Link to="/itunes">Itunes APP</Link>
				<br />
				<Link to="/covid-19-map">Covid-19 map</Link>
			</Col>
		</Row>
	</Container>
);
