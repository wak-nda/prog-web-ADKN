import React from 'react';

import '../styles/css/Loading.scss';

export const Loading = () => (
	<div className="Loading">
		<div className="spinner-grow text-success" role="status">
			<span className="sr-only">Loading...</span>
		</div>
		<div className="spinner-grow text-danger" role="status">
			<span className="sr-only">Loading...</span>
		</div>
		<div className="spinner-grow text-info" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	</div>
);
