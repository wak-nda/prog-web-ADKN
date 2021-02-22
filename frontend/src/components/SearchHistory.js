import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Button } from 'reactstrap';
import { HistoryContext, RESET } from '../context/HistoryContext';

import '../styles/css/SearchHistory.scss';

export const SearchHistory = () => {
	const { state, dispatch } = useContext(HistoryContext);
	const handleClickReset = () => {
		dispatch({ type: RESET });
	};

	return (
		<aside className="SearchHistory">
			{!!state.history.length && (
				<div className="mb-2">
					<h2>History</h2>
					<Button size="sm" onClick={handleClickReset}>
						<FontAwesomeIcon icon={faSync} className="mr-2" />
						reset
					</Button>
				</div>
			)}

			<ul>
				{(state.history || []).map((s, i) => (
					// eslint-disable-next-line react/no-array-index-key
					<li key={i}>{s}</li>
				))}
			</ul>
		</aside>
	);
};
