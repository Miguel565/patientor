import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField, InputLabel,FormControl, MenuItem } from '@mui/material';
import { HealthCheckRating } from '../../types';

import { EntryFormValues, Diagnosis } from '../../types';

interface Props {
    onSubmit: (value: EntryFormValues) => void;
}

const HealthCheckForm = ({ onSubmit }: Props) => {

    const [rating, setRating] = useState<HealthCheckRating>(Number(1));
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

    const handleSelect = (event: SelectChangeEvent) => {
        setRating(Number(event.target.value));
    };

    const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            description,
            date,
            type: "HealthCheck",
            specialist,
            diagnosisCodes,
            healthCheckRating: rating
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
                <FormControl fullWidth>
                    <InputLabel id="select-label">Health Check Rating</InputLabel>
                    <Select
                        labelId="select-label"
                        id="rating"
                        value={rating.toString()}
                        label="Health Check Rating"
                        onChange={handleSelect}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
                        <MenuItem value={HealthCheckRating.LowRisk}>Low</MenuItem>
                        <MenuItem value={HealthCheckRating.HighRisk}>High</MenuItem>
                        <MenuItem value={HealthCheckRating.CriticalRisk}>Critical</MenuItem>
                    </Select>
                </FormControl>
            </form>
        </div>
    );
};

export default HealthCheckForm;