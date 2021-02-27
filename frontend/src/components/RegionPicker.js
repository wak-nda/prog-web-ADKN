import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchRegions } from '../services/FetchData';
import '../styles/css/RegionPicker.scss';

export const RegionPicker = (({ handleRegionChange, region }) => {
	const [fetchedRegions, setFetchedRegions] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedRegions(await fetchRegions());
        }
        fetchAPI();
    }, []);
    // console.log(fetchedRegions);
    return (
        <Form className="centerF">
            <FormGroup controlId="exampleForm.ControlSelect1">
                <Label for="exampleSelect"><FontAwesomeIcon icon={faMapMarkedAlt} /> Etat courant de la région : {region}</Label>
                <Input type="select" className="selectStyle" name="select" id="exampleSelect" onChange={(e) => handleRegionChange(e.target.value)}>
                    <option>{region}</option>
                    {fetchedRegions.map(({ name }) => <option value={name}>{name}</option>)}
                </Input>
            </FormGroup>
        </Form>
    )
    }
)

RegionPicker.propTypes = {
	handleRegionChange: PropTypes.isRequired,
    region: PropTypes.isRequired
};
