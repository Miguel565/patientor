import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Icon } from '@mui/material';
import type { HospitalEntry } from '../../types';

interface Prop {
    entry: HospitalEntry;
}

const HospitalEntry = ({ entry }: Prop) => {
    return (
        <div>
            <p>
                {entry.date} <Icon component={MedicalServicesIcon} />
            </p>
            <p>
                {entry.description}
            </p>
            Diagnoses:
            <ul>
                {entry.diagnosisCodes?.map((code) => (
                    <li key={code}>
                        {code}
                    </li>
                ))}
            </ul>
            <p>
                Diagnose by; {entry.specialist}
            </p>
        </div>
    )
};

export default HospitalEntry;