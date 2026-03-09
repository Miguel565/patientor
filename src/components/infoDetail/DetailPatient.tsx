import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';

import { Patient, Gender, Entry } from '../../types';

import patientService from '../../services/patients';

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
                    <Typography>
                        {patient?.entries.map((entry: Entry) => (
                            <><p>{entry.date} {entry.description}</p>
                            <br/>
                            <ul>
                                <li key={entry.id}>
                                    {entry.diagnosisCode}
                                </li>
                            </ul></>
                        ))}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default DetailPatient;