import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';

import { Patient, Gender, Entry } from '../../types';

import patientService from '../../services/patients';

import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import HealthRatingBar from '../HealthRatingBar';

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
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const fetchPatient = async () => {
            let patient = await patientService.getPatient(id);
            setPatient(patient);
        };

        fetchPatient();
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