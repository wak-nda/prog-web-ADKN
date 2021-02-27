import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Col, Container, Row } from 'reactstrap';
import '../styles/css/Home.scss';
import '../styles/family.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faEnvelopeOpenText, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { ToggleModeNight } from '../components/ToggleModeNight';
import { Covid19Map } from './Covid-19Map';
import logo from '../assets/logo.jpg';
import AuthHelperMethods from '../services/AuthHelperMethods';
import { ThemeContext } from '../context/ThemeContext';
import { fetchTotalDataFrance, fetchTotalDataHosp, fetchDailyDataFrance } from '../services/FetchData';

export const Home = () => {
	const Auth = new AuthHelperMethods();
	const history = useHistory();
	const { theme, changeThemeContext } = useContext(ThemeContext);

	// let darkM = false;

	// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	// 	// dark mode
	// 	alert('dark');
	// }
	// localStorage.setItem('dark', 'dark');
	// let darkM = 'dark';

	const modeMe = (e: any) => {
		// alert('a changer');
		const newColorScheme = e.matches ? 'dark' : 'light';
		if (localStorage.getItem('dark') === newColorScheme) {
			// alert('ol');
		} else {
			// alert('ch');
			localStorage.setItem('dark', newColorScheme);
			changeThemeContext(e.matches ? 'dark' : 'light');
			// darkM = localStorage.getItem('dark');
		}
	};
//To watch for changes:
	window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', modeMe);
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', modeMe);



	// window.matchMedia('(prefers-color-scheme: dark)')
	// 	.addEventListener('change', event => {
	// 		if (event.matches !== darkM) {
	// 			//dark mode
	// 			console.log(event.matches);
	// 			darkM = event.matches;
	// 		}
	// 	});
	const [franceData, setFranceData] = useState([]);
	const [hospData, setHospData] = useState([]);
	const [dailyDataFrance, setDailyDataFrance] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchAPI = useCallback(async () => {
        setLoading(true);
        try {
            const responseFranceData = await fetchTotalDataFrance();
			const responseHospData = await fetchTotalDataHosp();
			const responseDailyDataFrance = await fetchDailyDataFrance();
			setDailyDataFrance(responseDailyDataFrance)
            setFranceData(responseFranceData);
			setHospData(responseHospData);
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);
		} finally {
			setLoading(false);
		}
	}, [])

	useEffect(() => {
		fetchAPI();
    }, [fetchAPI]);

	if (loading) {
        return (
			<p>
				{loading && (
					<FontAwesomeIcon icon={faSpinner} spin className="fa" />
				)}
			</p>
		)
    }

	console.log(dailyDataFrance);

	if (Auth.loggedIn()) {
		history.push('/');
	}

	function logout() {
		if (Auth.logout()) {
			history.push('/');
		}
	}

	function navigateToContact() {
		history.push('/mailing');
	}

	function navigateToHome() {
		history.push('/');
	}

	return (
		<div>
			<div>
				<Container>
					<Row>
						<Col>
							<div className="toolbar" role="banner">
								{/*<a>*/}
								<a onClick={navigateToHome}>
									<img
										alt="logo"
										width="70"
										src={logo}
									/>
								</a>
								<span className="policeHero right">Covid19 - Stats</span>
								<div className="spacer"> </div>
								<a onClick={navigateToContact}>
									<FontAwesomeIcon icon={faEnvelopeOpenText} className="iconMailing colI" />
								</a>
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
			<Container className="remove" fluid>
				<Row>
					<Col lg="4" className="paddZ">
						<div className="bodyX">
							<div className="jsx-2395746840 menu">
								<div className={`${theme === 'dark' ? 'jsx-347752997 scrollable-container blackG' : 'jsx-347752997 scrollable-container'}`}>
									<div className={`${theme === 'dark' ? 'jsx-3941331650 header greenG' : 'jsx-3941331650 header'}`}>
										<div className={`${theme === 'dark' ? 'jsx-3941331650 back blackG' : 'jsx-3941331650 back'}`}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											>
												<line x1="18" y1="20" x2="18" y2="10" />
												<line x1="12" y1="20" x2="12" y2="4" />
												<line x1="6" y1="20" x2="6" y2="14" />
											</svg>
											<span className={`${theme === 'dark' ? 'jsx-3941331650 policeHobo textWhite' : 'jsx-3941331650 policeHobo'}`}>France</span>
										</div>
										<h3 className="jsx-3941331650">
											COVID-19 - France
											<ToggleModeNight />
										</h3>
									</div>
									<div>
										<br />
										<Container>
											<Row>
												<Col>
													<div className="jsx-2793952281 counter clickable ">
														<div className="jsx-2793952281 warning-icon"> </div>
														<div className="jsx-2793952281 value">{franceData.data ? franceData.data.casConfirmes : 0}</div>
														{/* <div className="jsx-2793952281 difference">( + 25 403 )</div> */}
														<div className="jsx-2793952281">Nombre de cas confirmés</div>
													</div>
												</Col>
												<Col>
													<div className="jsx-2793952281 counter clickable ">
														<div className="jsx-2793952281 warning-icon"> </div>
														<div className="jsx-2793952281 value">{franceData.data ? franceData.data.deces : 0}</div>
														{/* <div className="jsx-2793952281 difference">( + 25 403 )</div> */}
														<div className="jsx-2793952281">Nombre de décès</div>
													</div>
												</Col>
												{/*<Col>*/}

												{/*</Col>*/}

												{/*<Col>*/}

												{/*</Col>*/}
											</Row>
										</Container>
										<div className="jsx-1180261630 title policeHobo">Données hospitalières</div>
										<Container>
											<Row>
												<Col>
													<div className="jsx-2793952281 counter clickable ">
														<div className="jsx-2793952281 warning-icon"> </div>
														<div className="jsx-2793952281 value">{hospData.data ? hospData.data.numberOfHospitalized : 0}</div>
														{/* <div className="jsx-2793952281 difference">( + 25 403 )</div> */}
														<div className="jsx-2793952281">Nombre de patients hospitalisé</div>
													</div>
												</Col>
												<Col>
													<div className="jsx-2793952281 counter clickable ">
														<div className="jsx-2793952281 warning-icon"> </div>
														<div className="jsx-2793952281 value">{hospData.data ? hospData.data.numberOfPeopleInRea : 0}</div>
														{/* <div className="jsx-2793952281 difference">( + 25 403 )</div> */}
														<div className="jsx-2793952281">Nombre de patients en réanimation</div>
													</div>
												</Col>
											</Row>
											<Row>
												<Col>
													<div className="jsx-2793952281 counter clickable ">
														<div className="jsx-2793952281 warning-icon"> </div>
														<div className="jsx-2793952281 value">{hospData.data ? hospData.data.numberOfRecovered : 0}</div>
														{/* <div className="jsx-2793952281 difference">( + 25 403 )</div> */}
														<div className="jsx-2793952281">Nombre de retours à domicile</div>
													</div>
												</Col>
												<Col>
													<div className="jsx-2793952281 counter clickable ">
														<div className="jsx-2793952281 warning-icon"> </div>
														<div className="jsx-2793952281 value">{hospData.data ? hospData.data.numberOfDeaths : 0}</div>
														{/* <div className="jsx-2793952281 difference">( + 25 403 )</div> */}

														<div className="jsx-2793952281"><br />Nombre de déces</div>
													</div>
												</Col>
											</Row>
										</Container>
										<div className="jsx-1180261630 title policeHobo">Taux d&apos;incidence</div>
										<br />
										<br />
										<Container>
											<ChartsFrance dailyDataFrance={dailyDataFrance.data ? dailyDataFrance.data : [{ date: '', casConfirmes: 0, deces: 0 }]} />
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
					</Col>
					<Col lg="8" className="paddZ">
						<div className="bodyXX">
							<Covid19Map />
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

						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
