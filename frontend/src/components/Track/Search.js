import { memo, useState } from 'react';
import PropTypes from 'prop-types';

import './Search.scss';

export const TrackSearch = memo(({ onClick, onKeyPress }) => {
	const [term, setTerm] = useState('');
	const [search, setSearch] = useState([]);

	const handleChange = (e) => {
		setTerm(e.target.value);
	};

	const handleClick = () => {
		const searchTeam = term.trim();

		setSearch([...search, searchTeam]);
		onClick(searchTeam);
	};

	return (
		<div className="TrackSearch">
			<input
				type="text"
				placeholder="search"
				id="search"
				onChange={handleChange}
				onKeyPress={onKeyPress}
				value={term}
			/>
			<button type="button" className="btn" onClick={handleClick}>
				Search
			</button>
		</div>
	);
});

TrackSearch.propTypes = {
	onClick: PropTypes.func.isRequired,
	onKeyPress: PropTypes.func
};

TrackSearch.defaultProps = {
	onKeyPress: null
};
