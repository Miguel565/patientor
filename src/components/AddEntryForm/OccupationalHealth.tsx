import React, { useState } from 'react';
import { InputLabel, Button, TextField } from '@mui/material';
import { EntryFormValues, Diagnosis } from '../../types';

interface Props {
    onSubmit: (value: EntryFormValues) => void;
}

const OccupationForm = ({ onSubmit }: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [employerName, setEmployerName] = useState<string>('');

    const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            description,
            date,
            type: "OccupationalHealthcare",
            specialist,
            diagnosisCodes,
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
                    <TextField
                        required
                        label='Date'
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
                <div>
                    <TextField
                        required
                        label='Diagnosis codes (comma separated)'
                        name='DiagnosisCodes'
                        value={diagnosisCodes.join(',')}
                        variant='filled'
                        onChange={({ target }) => setDiagnosisCodes(target.value.split(',').map(code => code.trim()))}
                    />
                </div>
                <div>
                    <TextField
                        required
                        label='Employer Name'
                        value={employerName}
                        variant='filled'
                        onChange={({ target }) => setEmployerName(target.value)}
                    />
                </div>
                <InputLabel>Sick Leave</InputLabel>
                <div>
                    <TextField
                        label='Start date'
                        value={startDate}
                        variant='filled'
                        onChange={({ target }) => setStartDate(target.value)}
                    />
                </div>
                <div>
                    <TextField 
                        label='End date'
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