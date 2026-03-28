import React, { useState, useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    InputLabel,
    Button,
    TextField,
    Typography,
    FormControl,
    MenuItem
} from '@mui/material';
import { EntryFormValues, Diagnosis } from '../../types';

import diagnosis from '../../services/diagnosis';

interface Props {
    onSubmit: (value: EntryFormValues) => void;
}

const OccupationForm = ({ onSubmit }: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis>>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [employerName, setEmployerName] = useState<string>('');
    const [diagnosisCodeSelected, setDiagnosisCodeSelected] = useState<Array<Diagnosis['code']>>([]);

    useEffect(() => {
        const fetchDiagnosis = async () => {
            const diagnos = await diagnosis.getAllDiagnosis();
            setDiagnosisCodes(diagnos);
        };

        fetchDiagnosis();
    }, []);

    const handleDiagnosisSelected = (event: SelectChangeEvent<typeof diagnosisCodeSelected>) => {
        const {
            target: { value },
        } = event;
        setDiagnosisCodeSelected(
            typeof value === "string"
                ? value.split(",")
                : value
        );
    };

    const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            description,
            date,
            type: "OccupationalHealthcare",
            specialist,
            diagnosisCodes: diagnosisCodeSelected,
            employerName,
            sickLeave: {
                startDate,
                endDate
            }
        });
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <div>
                    <TextField
                        required
                        label='Description'
                        name='Description'
                        value={description}
                        variant='filled'
                        onChange={({ target }) => setDescription(target.value)}
                    />
                </div>
                <div>
                    <InputLabel>Date Entry</InputLabel>
                    <TextField
                        required
                        type='date'
                        name='date'
                        value={date}
                        variant='filled'
                        onChange={({ target }) => setDate(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        label='Specialist'
                        value={specialist}
                        variant='filled'
                        onChange={({ target }) => setSpecialist(target.value)}
                    />
                </div>
                <FormControl>
                    <InputLabel>Diagnosis codes</InputLabel>
                    <Select
                        required
                        multiple
                        renderValue={(selected) => selected.join(', ')}
                        value={diagnosisCodeSelected}
                        onChange={handleDiagnosisSelected}
                    >
                        {diagnosisCodes.map((option) => (
                            <MenuItem key={option.code} value={option.code}>
                                {option.code} - {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div>
                    <TextField
                        required
                        label='Employer Name'
                        value={employerName}
                        variant='filled'
                        onChange={({ target }) => setEmployerName(target.value)}
                    />
                </div>
                <Typography variant='h3' >Sick Leave</Typography>
                <div>
                    <InputLabel>Start Date</InputLabel>
                    <TextField
                        type='date'
                        value={startDate}
                        variant='filled'
                        onChange={({ target }) => setStartDate(target.value)}
                    />
                </div>
                <div>
                    <InputLabel>End Date</InputLabel>
                    <TextField
                        type='date'
                        value={endDate}
                        variant='filled'
                        onChange={({ target }) => setEndDate(target.value)}
                    />
                </div>
                <div>
                    <Button variant='contained' color='success'>ADD</Button>
                </div>
            </form>
        </div>
    );
};

export default OccupationForm;