import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';

import { Patient, Gender, Entry, EntryFormValues, Diagnosis } from '../../types';

import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';

import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import HealthRatingBar from '../HealthRatingBar';

import Togglable from '../AddEntryTogglable/index';
import EntryForm from '../AddEntryForm/index';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry />;
        case "OccupationalHealthcare":
            return <OccupationalEntry />;
        case "HealthCheck":
            return <HealthCheckEntry />;
        default:
            return assertNever(entry);
    }
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated component member: ${JSON.stringify(value)}`);
}

const DetailPatient = () => {
    const [patient, setPatient] = useState<Patient>();
    const [entries, setEntries] = useState<Array<Entry>>([]);
    const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([])
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

        const fetchDiagnosis = async () => {
            let diagnoses = await diagnosisService.getAllDiagnosis();
            setDiagnoses(diagnoses);
        };

        fetchDiagnosis();
    }, []);

    /**
     * Esperando un array de entries del backend
     * const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if (!id) return;
            const entry = await patientService.createEntry(id, values);
            if (entry.diagnosisCodes) {
                entry.diagnosisCodes = entry.diagnosisCodes.map(code => {
                    const diagnosis = diagnoses.find(d => d.code === code);
                    return `${diagnosis!.code} - ${diagnosis!.name}`;
                });
            }
        } catch (e: unknown) {
            console.error("Unknown error", e);
        }
    };*/

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
                    <Togglable buttonLabel='ADD NEW ENTRY' ref={patientRef}>
                        <EntryForm onSubmit={submitNewEntry} />
                    </Togglable>
                    <Typography variant='h5'>Entries</Typography>
                    <Typography borderRadius={2} borderColor={'black'}>
                        {patient?.entries.map((entry: Entry) => (
                            <>
                                <Typography>
                                    {entry.date} <EntryDetails entry={entry} />
                                </Typography>
                                <Typography>
                                    {entry.description}
                                </Typography>
                                <span>
                                    {entry.type === 'HealthCheck'
                                        ? <HealthRatingBar rating={entry.healthCheckRating.valueOf()} showText={false} />
                                        : null
                                    }
                                </span>
                                <br />
                                <Typography>
                                    Diagnose by {entry.specialist}
                                </Typography>
                            </>
                        ))}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default DetailPatient;