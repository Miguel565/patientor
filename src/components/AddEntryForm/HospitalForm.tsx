import React, { useState } from 'react';
import { InputLabel, TextField, FormControl, Button } from '@mui/material';

import { EntryFormValues, Diagnosis } from '../../types';

interface Props {
    onSubmit: (value: EntryFormValues) => void;
}

const HospitalForm = ({ onSubmit }: Props) => {
    const [date, setDate] = useState<string>("");
    const [criteria, setCriteria] = useState<string>("");
    const [description, setDescription] = useState<string>('');
    const [dateEntry, setDateEntry] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

    const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            description,
            date: dateEntry,
            type: "Hospital",
            specialist,
            diagnosisCodes,
            discharge: {
                date, 
                criteria
            }
        });
        
    };

    return (
        <div>
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
                        value={dateEntry}
                        variant='filled'
                        onChange={({ target }) => setDateEntry(target.value)}
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
                <InputLabel>Discharge</InputLabel>
                <FormControl>
                    <TextField
                        required
                        label='date'
                        name='date'
                        variant='filled'
                        value={date}
                        onChange={({ target }) => setDate(target.value)}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        required
                        label="criteria"
                        value={criteria}
                        onChange={({ target }) => setCriteria(target.value)}
                        variant='filled'
                    />
                </FormControl>
                <div>
                    <Button variant='contained' color='success'>ADD</Button>
                </div>
            </form>
        </div>
    );
};

export default HospitalForm;