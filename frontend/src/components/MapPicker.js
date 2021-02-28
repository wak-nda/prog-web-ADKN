import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchDataType } from '../services/FetchData';
import '../styles/css/RegionPicker.scss';

export const MapPicker = (({ handleDataTypeChange, dataType }) => {
		const [fetchedD, setFetchedD] = useState([]);
		useEffect(() => {
			const fetchAPI = async () => {
				setFetchedD(await fetchDataType());
			}
			fetchAPI();
		}, []);
		return (
			<Form className="centerF">
				<FormGroup controlId="exampleForm.ControlSelect1">
					<Label for="exampleSelect"><FontAwesomeIcon icon={faSortAmountDownAlt} /> Filtré par : {dataType}</Label>
					<Input type="select" className="selectStyle" name="select" id="exampleSelect" onChange={(e) => handleDataTypeChange(e.target.value)}>
						{fetchedD.map(({ name }) => <option value={name}>{name}</option>)}
					</Input>
				</FormGroup>
			</Form>
		)
	}
)

MapPicker.propTypes = {
	handleDataTypeChange: PropTypes.isRequired,
	dataType: PropTypes.isRequired
};
