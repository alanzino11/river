import React, {useState} from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Button } from "reactstrap";

import './components.css'
import {interestOptions, departments, yearsWorkedOptions} from '../formData'
import river from '../logos/river.png';

const InterestForm = ({ closeModal }) => {
    const animatedComponents = makeAnimated();
    const [interests, setInterests] = useState([])
    const [department, setDepartment] = useState({value: null, label: null})
    const [yearsWorked, setYearsWorked] = useState({value: null, label: null});

    function submitForm() {
        let formData = {
            interests: [],
            department: department.value,
            yearsWorked: yearsWorked.value
        };
        for (const interest of interests)
            formData.interests.push(interest.value)

        console.log(formData)
        // push formData to Firebase 
        
        closeModal();
    }

    return (
        <div className="interest-form">
            <div style={{maxWidth: '700px'}}>
                <div style={{ justifyContent: 'center', display: 'flex', marginBottom: '1em'}}>
                    <img src={river} height={100}/>
                </div>
                <h2 className="header3">Before you get started, tell us about yourself.</h2>
                <h3 className="header3">Pick out some of your interests.</h3>
                <Select
                    components={animatedComponents}
                    options={interestOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    onChange={(event) => setInterests(event)}
                />
                <h3 className="header3">What department are you in?</h3>
                <Select
                    components={animatedComponents}
                    options={departments}
                    closeMenuOnSelect={true}
                    onChange={(event) => setDepartment(event)}
                />
                <h3 className="header3">How long have you been employed at RV?</h3>
                <Select
                    components={animatedComponents}
                    options={yearsWorkedOptions}
                    closeMenuOnSelect={true}
                    onChange={(event) => setYearsWorked(event)}
                />
                <div style={{ justifyContent: 'center', display: 'flex', marginBottom: '1em'}}>
                    <Button
                        style={{backgroundColor: 'lightblue', height: 50, color: 'black', fontSize: 20, margin: '2em', alignSelf: 'center' }}
                        onClick={submitForm}
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterestForm;