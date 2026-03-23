import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Icon } from '@mui/material';
import HealthRatingBar from '../HealthRatingBar';

import type { HealthCheckEntry } from '../../types';

interface Prop {
    entry: HealthCheckEntry;
}

const HealthCheckEntry = ({ entry }: Prop) => {
    return (
        <div>
            <p>
                {entry.date} <Icon component={HealthAndSafetyIcon} />
            </p>
            <p>
                {entry.description}
            </p>
            <HealthRatingBar
                showText={false}
                rating={entry.healthCheckRating.valueOf()}
            />
            Diagnoses: 
            <ul>
                {entry.diagnosisCodes?.map((code) => (
                    <li key={code}>
                        {code}
                    </li>
                ))}
            </ul>
            <p>
                Disgnose by: {entry.specialist}
            </p>
        </div>
    );
};

export default HealthCheckEntry;