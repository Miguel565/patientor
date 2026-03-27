import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';
import EntryDetails from "./EntryDetail";

import { Patient, Gender, Entry } from '../../types';

import patientService from '../../services/patients';

import Togglable from '../AddEntryTogglable/index';
import EntryForm from '../AddEntryForm/index';
import Notify from '../Notify/index';

const DetailPatient = () => {
    const [patient, setPatient] = useState<Patient>();
    const [entries, setEntries] = useState<Array<Entry>>([]);
    const [message, setMessage] = useState<string>();

    const { id } = useParams();

    const patientRef = useRef();

    useEffect(() => {
        if (!id) return;

        const fetchPatientById = async () => {
            let patient = await patientService.getPatient(id);
            setPatient(patient);
            setEntries(patient.entries);
        };

        fetchPatientById();
    }, []);

    const handleGender = () => {
        switch (patient?.gender) {
            case Gender.Female:
                return <Female color='secondary' />;
            case Gender.Male:
                return <Male color='primary' />;
            default:
                return <Transgender />;
        }
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant='h3'>
                        {patient?.name} {handleGender()}
                    </Typography>
                    <br />
                    <Typography>
                        ssn: {patient?.ssn}
                    </Typography>
                    <Typography>
                        Occupation: {patient?.occupation}
                    </Typography>
                    <Divider />
                    <Notify message={message} setMessage={setMessage} />
                    <Togglable buttonLabel='ADD NEW ENTRY' ref={patientRef}>
                        <EntryForm entries={entries} setEntries={setEntries} setMessage={setMessage} />
                    </Togglable>
                    <Typography variant='h5'>Entries</Typography>
                    <Typography borderRadius={2} borderColor={'black'}>
                        <ul>
                            {entries?.map((entry: Entry) => (
                                <>
                                    <li key={entry.id} >
                                        <EntryDetails entry={entry} />
                                    </li>
                                </>
                            ))}
                        </ul>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default DetailPatient;