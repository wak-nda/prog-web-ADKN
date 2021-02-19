import PropTypes from 'prop-types';

import './AudioPlayer.scss';

export const AudioPlayer = ({ track }) => (
	<audio
		className="AudioPlayer"
		controls
		autoPlay
		src={track && track.previewUrl}
	>
		Your browser does not support the
		<code>audio</code> element.
	</audio>
);

AudioPlayer.propTypes = {
	track: PropTypes.shape({
		previewUrl: PropTypes.string.isRequired
	})
};

AudioPlayer.defaultProps = {
	track: null
};
