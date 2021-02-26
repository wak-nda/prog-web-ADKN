import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import {fetchRegions} from '../../api/index';

export const RegionPicker = (({handleRegionChange, region}) =>{

    const [fetchedRegions, setFetchedRegions] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedRegions(await fetchRegions())
        }
        fetchAPI();
    }, []);
    // console.log(fetchedRegions);
    return(
        <div>
            <h2>Etat courant de la région : {region}</h2>
        <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={(e) => handleRegionChange(e.target.value)}>
                    <option value=''>{region}</option>
                    {fetchedRegions.map(({name}) => <option value={name}>{name}</option>)}
                </Form.Control>
            </Form.Group>
        </Form>
        </div>
        
    )
    }   
)