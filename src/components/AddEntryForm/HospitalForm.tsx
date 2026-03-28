import React, { useState, useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { 
    InputLabel, 
    TextField, 
    FormControl, 
    Button,
    MenuItem 
} from '@mui/material';

import diagnosis from '../../services/diagnosis';

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
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis>>([]);
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
            date: dateEntry,
            type: "Hospital",
            specialist,
            diagnosisCodes: diagnosisCodeSelected,
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
                <FormControl>
                    <InputLabel>Date Entry</InputLabel>
                    <TextField
                        required
                        type='date'
                        name='date'
                        value={dateEntry}
                        variant='filled'
                        onChange={({ target }) => setDateEntry(target.value)}
                    />
                </FormControl>
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
                <InputLabel>Discharge</InputLabel>
                <FormControl>
                    <InputLabel>Date Discharge</InputLabel>
                    <TextField
                        required
                        type='date'
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