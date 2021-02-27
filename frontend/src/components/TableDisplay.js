import React, {
	useCallback, useContext, useEffect, useState
} from 'react';
import {
	Table, Column, HeaderCell, Cell
} from 'rsuite-table';
import logo from '../assets/logo.jpg';
import AuthHelperMethods from '../services/AuthHelperMethods';
import '../styles/css/Home.scss';
import '../styles/family.css';
import 'rsuite-table/dist/css/rsuite-table.css';
import { ThemeContext } from '../context/ThemeContext';
import { fetchMockData, fetchTotalDataHospRegions } from '../services/FetchData';

export const TableDisplay = () => {
	const { dataS, setData } = useState([]);

	const fetchAPI = useCallback(async () => {
		try {
			const dataR = await fetchMockData();
			setData(dataR);
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);
		} finally {
		}
	}, []);

	useEffect(() => {
		fetchAPI();
	}, [fetchAPI]);

	return (
		<div>
			<Table
				height={400}
				data={dataS}
				onRowClick={(data) => {
					console.log(data);
				}}
			>
				<Column width={70} align="center" fixed>
					<HeaderCell>Id</HeaderCell>
					<Cell dataKey="id" />
				</Column>

				<Column width={200} fixed>
					<HeaderCell>First Name</HeaderCell>
					<Cell dataKey="firstName" />
				</Column>

				<Column width={200}>
					<HeaderCell>Last Name</HeaderCell>
					<Cell dataKey="lastName" />
				</Column>

				<Column width={200}>
					<HeaderCell>City</HeaderCell>
					<Cell dataKey="city" />
				</Column>

				<Column width={200}>
					<HeaderCell>Street</HeaderCell>
					<Cell dataKey="street" />
				</Column>

				<Column width={300}>
					<HeaderCell>Company Name</HeaderCell>
					<Cell dataKey="companyName" />
				</Column>

				<Column width={300}>
					<HeaderCell>Email</HeaderCell>
					<Cell dataKey="email" />
				</Column>
				<Column width={120} fixed="right">
					<HeaderCell>Action</HeaderCell>
				</Column>
			</Table>
		</div>
	);
};

// Header.propTypes = {
// 	mailing: PropTypes.bool
// };
//
// Header.defaultProps = {
// 	mailing: false
// };
