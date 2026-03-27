import { useState } from 'react';
import { Typography, RadioGroup, Radio, FormControlLabel } from '@mui/material';

import { EntryFormValues, Entry } from '../../types';
import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';

import HealthCheckForm from './HealthCheckForm';
import OccupationForm from './OccupationalHealth';
import HospitalForm from './HospitalForm';

enum entryType {
    Hospital = 'Hospital',
    Occupational = 'OccupationalHealtcare',
    HealthCheck = 'HealthCheck'
}

interface Props {
    entries: Entry[];
    setEntries: (value: Entry[]) => void;
    setMessage: (value: string) => void;
}

const EntryForm = ({ entries, setEntries, setMessage }: Props) => {

    const { id } = useParams();

    const [type, setType] = useState<string>('Hospital');

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if (!id) return;
            const entry = await patientService.createEntry(id, values);
            setEntries(entries.concat(entry));
        } catch (e: unknown) {
            setMessage(`${e}`);
        }
    };

    const handleEntryType = () => {
        switch (type) {
            case entryType.HealthCheck:
                return <HealthCheckForm onSubmit={submitNewEntry} />;
            case entryType.Occupational:
                return <OccupationForm onSubmit={submitNewEntry} />;
            case entryType.Hospital:
                return <HospitalForm onSubmit={submitNewEntry} />;
        }
    };

    return (
        <div>
            <Typography variant='h3'>
                New Entry!
            </Typography>
            <RadioGroup>
                <FormControlLabel
                    value={entryType.HealthCheck}
                    label="HealthCheck"
                    control={<Radio onClick={() => setType(entryType.HealthCheck.toString())} />}
                />
                <FormControlLabel 
                    value={entryType.Occupational}
                    label="Occupational Healthcare"
                    control={<Radio onClick={() => setType(entryType.Occupational.toString())} />}
                />
                <FormControlLabel
                    value={entryType.Hospital}
                    label="Hospital"
                    control={<Radio onClick={() => setType(entryType.Hospital.toString())} />}
                />
            </RadioGroup>
            <div>
                {type && handleEntryType()}
            </div>
        </div>
    );
}

export default EntryForm;