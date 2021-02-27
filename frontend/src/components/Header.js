import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import logo from '../assets/logo.jpg';
import AuthHelperMethods from '../services/AuthHelperMethods';
import '../styles/css/Home.scss';
import '../styles/family.css';

export const Header = ({ mailing }) => {
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

	function navigateToContact() {
		if (Auth.logout()) {
			history.push('/mailing');
		}
	}

	function navigateToHome() {
		history.push('/home');
	}

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<div className="toolbar" role="banner">
							{/*<a>*/}
							<img
								onClick={navigateToHome}
								alt="logo"
								width="70"
								src={logo}
							/>
							{/*</a>*/}
							<span className="policeHero right">Covid19 - Stats</span>
							<div className="spacer"> </div>
							{ mailing ? null : (
								<a onClick={navigateToContact}>
									<FontAwesomeIcon icon={faEnvelopeOpenText} className="iconMailing colI" />
								</a>
							)}

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
	);
};

Header.propTypes = {
	mailing: PropTypes.bool
};

Header.defaultProps = {
	mailing: false
};
