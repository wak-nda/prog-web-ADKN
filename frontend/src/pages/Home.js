import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import '../styles/css/Home.scss';
import '../styles/family.css';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.jpg';
import AuthHelperMethods from '../services/AuthHelperMethods';

export const Home = () => {
	const Auth = new AuthHelperMethods();
	const history = useHistory();

	if (Auth.loggedIn()) {
		history.push('/');
	}

	function logout() {
		if (Auth.logout()) {
			history.push('/');
		}
	}

	return (
		<Container>
			<Row>
				<Col>
					<div className="toolbar" role="banner">
						{/*<a>*/}
						<img
							alt="logo"
							width="70"
							src={logo}
						/>
						{/*</a>*/}
						<span className="policeHero right">Covid19 - Stats</span>
						<div className="spacer"> </div>
						<a onClick={logout}>
							<FontAwesomeIcon icon={faWindowClose} className="iconLogin colI" />
						</a>
					</div>
					{/*<h1>Home</h1>*/}
					{/*<Link to="/itunes">Itunes APP</Link>*/}
					{/*<br />*/}
					{/*<Link to="/covid-19-map">Covid-19 map</Link>*/}
				</Col>
			</Row>
		</Container>
	);
};
