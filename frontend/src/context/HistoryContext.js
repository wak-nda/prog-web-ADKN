import React, {
	useReducer, createContext,
} from 'react';
import PropTypes from 'prop-types';
import logger from 'use-reducer-logger';

export const HistoryContext = createContext();
export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const RESET = 'RESET';

const initialState = {
	history: [],
};

const reducer = (state, action) => {
	let nextState = {};
	switch (action.type) {
	case ADD_TO_HISTORY:
		nextState = {
			...state,
			history: [...state.history, action.payload],
		};
		break;
	case RESET:
		nextState = initialState;
		break;
	default:
		throw new Error();
	}

	return nextState;
};

export const HistoryContextProvider = ({ children }) => {
	const { NODE_ENV } = process.env;
	const [state, dispatch] = useReducer(
		NODE_ENV === 'development' ? logger(reducer) : reducer,
		initialState,
	);
	return (
		<HistoryContext.Provider value={{ state, dispatch }}>
			{children}
		</HistoryContext.Provider>
	);
};

HistoryContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
