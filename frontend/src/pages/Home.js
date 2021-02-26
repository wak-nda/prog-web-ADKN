import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import '../styles/css/Home.scss';
import '../styles/family.css';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.jpg';
import AuthHelperMethods from '../services/AuthHelperMethods';
import { ToggleModeNight } from '../components/ToggleModeNight';

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
		<div>
			<div>
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
			</div>
			<div className="bodyX">
				<div className="jsx-2395746840 menu">
					<div className="jsx-347752997 scrollable-container">
						<div className="jsx-3941331650 header">
							<div className="jsx-3941331650 back">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokelinejoin="round"
								>
									<line x1="18" y1="20" x2="18" y2="10" />
									<line x1="12" y1="20" x2="12" y2="4" />
									<line x1="6" y1="20" x2="6" y2="14" />
								</svg>
								<span className="jsx-3941331650 policeHobo">France</span>
							</div>
							<h3 className="jsx-3941331650">
								COVID-19 - France
								<ToggleModeNight />
							</h3>
						</div>
						<div>
							<Container>
								<Row>
									{/*<Col>*/}

									{/*</Col>*/}

									{/*<Col>*/}

									{/*</Col>*/}

									{/*<Col>*/}

									{/*</Col>*/}
								</Row>
								<Row>
									<Col xs="3">.col-3</Col>
									<Col xs="auto">.col-auto - variable width content</Col>
									<Col xs="3">.col-3</Col>
								</Row>
								<Row>
									<Col xs="6">.col-6</Col>
									<Col xs="6">.col-6</Col>
								</Row>
								<Row>
									<Col xs="6" sm="4">.col-6 .col-sm-4</Col>
									<Col xs="6" sm="4">.col-6 .col-sm-4</Col>
									<Col sm="4">.col-sm-4</Col>
								</Row>
								<Row>
									<Col sm={{ size: 6, order: 2, offset: 1 }}>.col-sm-6 .order-sm-2 .offset-sm-1</Col>
								</Row>
								<Row>
									<Col sm="12" md={{ size: 6, offset: 3 }}>.col-sm-12 .col-md-6 .offset-md-3</Col>
								</Row>
								<Row>
									<Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
									<Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
								</Row>
							</Container>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TEST</h1>
							<h1>TESTA</h1>

						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
