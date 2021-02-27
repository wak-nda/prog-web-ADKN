import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

import { fetchRegions } from '../services/FetchData';

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
        <Form>
            <FormGroup controlId="exampleForm.ControlSelect1">
                <Label for="exampleSelect">Etat courant de la région : {region}</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={(e) => handleRegionChange(e.target.value)}>
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
