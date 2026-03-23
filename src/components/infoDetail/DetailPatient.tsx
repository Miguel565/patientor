import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';
import EntryDetails from "./EntryDetail";

import { Patient, Gender, Entry, EntryFormValues } from '../../types';

import patientService from '../../services/patients';

import Togglable from '../AddEntryTogglable/index';
import EntryForm from '../AddEntryForm/index';
import Notify from '../Notify';

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

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if (!id) return;
            const entry = await patientService.createEntry(id, values);
            setEntries(entries.concat(entry));
        } catch (e: unknown) {
            setMessage(`${e}`);
        }
    };

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
                        <EntryForm onSubmit={submitNewEntry} />
                    </Togglable>
                    <Typography variant='h5'>Entries</Typography>
                    <Typography borderRadius={2} borderColor={'black'}>
                        <ul>
                            {patient?.entries?.map((entry: Entry) => (
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