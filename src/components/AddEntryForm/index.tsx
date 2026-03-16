import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';

import { Diagnosis, EntryFormValues } from '../../types';

interface Props {
    onSubmit: (values: EntryFormValues) => void;
};

const EntryForm = ({ onSubmit }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);

    const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            description,
            date,
            type: "HealthCheck",
            specialist,
            diagnosisCodes,
            healthCheckRating: Number(healthCheckRating)
        });
    };

    return (
        <div>
            <Typography variant='h3'>
                New Etries!
            </Typography>
            <form onSubmit={addEntry} >
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
                        label='HealthCheck Rating'
                        name='HealthCheckRating'
                        value={healthCheckRating}
                        variant='filled'
                        onChange={({ target }) => setHealthCheckRating(target.value)}
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
                    <Button variant='contained' color='success'>ADD</Button>
                </div>
            </form>
        </div>
    );
}

export default EntryForm;