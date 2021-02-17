import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Track } from './Track';

import './List.scss';

export const TrackList = ({ loading, onClickTrack, tracks }) => (
	<div className="TrackList">
		<p>
			{loading && (
				<FontAwesomeIcon icon={faSpinner} spin className="fa" />
			)}
		</p>
		<ul>
			{!loading && (tracks || []).map((t) => (
				<Track track={t} onClickTrack={onClickTrack} />
			))}
		</ul>
	</div>
);

TrackList.propTypes = {
	loading: PropTypes.bool,
	tracks: PropTypes.arrayOf(PropTypes.shape({})),
	onClickTrack: PropTypes.func.isRequired,
};

TrackList.defaultProps = {
	loading: false,
	tracks: [],
};
