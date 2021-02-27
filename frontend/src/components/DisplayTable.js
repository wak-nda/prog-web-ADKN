import React from 'react';
import {
	Table, Column, HeaderCell, Cell
} from 'rsuite-table';
import '../styles/css/Home.scss';
import '../styles/css/DisplayTable.scss';
import '../styles/family.css';
// import 'rsuite-table/dist/css/rsuite-table.css';
import PropTypes from 'prop-types';

export const DisplayTable = ({ dataR }) => {
	const dataS = dataR;
	// const fetchAPI = useCallback(async () => {
	//  try {
	//      const dataR = await fetchMockData();
	//      setData(dataR);
	//  } catch (e) {
	//      // eslint-disable-next-line no-console
	//      console.log(e);
	//  } finally {
	//      //
	//  }
	// }, []);
	// (async () => {
	// 	try {
	// 		setData(await fetchMockData());
	// 	} catch (e) {
	// 		console.log(e);
	// 	} finally {
	// 		//
	// 	}
	// })();

	// useEffect(() => {
	//  (async () => {
	//      try {
	//          const dataR = await fetchMockData();
	//      } catch (e) {
	//          // eslint-disable-next-line no-console
	//          console.log(e);
	//      } finally {
	//          //
	//      }
	//  })();
	// }, [dataS]);
	return (
		<div>
			<Table
				height={400}
				data={dataS}
				onRowClick={(data) => {
					console.log(data);
				}}
			>
				<Column width={200} align="center" fixed>
					<HeaderCell>Region</HeaderCell>
					<Cell dataKey="regionName" />
				</Column>
				<Column width={200} fixed>
					<HeaderCell>Reanimation</HeaderCell>
					<Cell dataKey="numberOfPeopleInRea" />
				</Column>
				<Column width={200}>
					<HeaderCell>Hospitalisés</HeaderCell>
					<Cell dataKey="numberOfHospitalized" />
				</Column>
				<Column width={200}>
					<HeaderCell>City</HeaderCell>
					<Cell dataKey="numberOfRecovered" />
				</Column>
				<Column width={200} className="redC">
					<HeaderCell>Morts</HeaderCell>
					<Cell dataKey="numberOfDeaths" />
				</Column>
				<Column width={300}>
					<HeaderCell>Date</HeaderCell>
					<Cell dataKey="jour" />
				</Column>
				{/*<Column width={300}>*/}
				{/* <HeaderCell>Email</HeaderCell>*/}
				{/* <Cell dataKey="email" />*/}
				{/*</Column>*/}
				{/*<Column width={120} fixed="right">*/}
				{/* <HeaderCell>Action</HeaderCell>*/}
				{/*</Column>*/}
			</Table>
		</div>
	);
};

DisplayTable.propTypes = {
	dataR: PropTypes.shape({})
};

DisplayTable.defaultProps = {
	dataR: null
};
