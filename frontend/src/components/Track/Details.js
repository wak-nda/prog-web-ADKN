import PropTypes from 'prop-types';

import './Details.scss';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const TrackDetails = ({ track }) => {
	const { theme } = useContext(ThemeContext);
	if (!track) {
		return (<Redirect to="/itunes/" />);
	}

	return (
		<section className="TrackDetails">
			<h1>{track.artistName}</h1>
			<ul>
				<li key="id">id : {track.trackId}</li>
				<li key="Name">Name : {track.trackName}</li>
				<li key="collectionName">collectionName : {track.collectionName}</li>
				<li key="country">country : {track.country}</li>
				<li key="primaryGenreName">primaryGenreName : {track.primaryGenreName}</li>
				{
					track.artworkUrl100
					&& (
						<li key="thumb">
							<img src={track.artworkUrl100} alt="thumb" />
						</li>
					)
				}
			</ul>
			<Link to="/itunes/" className={`${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
				<FontAwesomeIcon icon={faArrowLeft} />
				<span className="ml-2">back</span>
			</Link>
		</section>
	);
};

TrackDetails.propTypes = {
	track: PropTypes.shape({
		artworkUrl100: PropTypes.string,
		trackId: PropTypes.number,
		artistName: PropTypes.string,
		trackName: PropTypes.string,
		collectionName: PropTypes.string,
		country: PropTypes.string,
		primaryGenreName: PropTypes.string
	})
};

TrackDetails.defaultProps = {
	track: null
};
