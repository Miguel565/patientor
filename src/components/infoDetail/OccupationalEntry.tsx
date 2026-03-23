import WorkIcon from '@mui/icons-material/Work';
import { Icon } from '@mui/material';

import type { OccupationalHealthcareEntry } from '../../types';

interface Prop {
    entry: OccupationalHealthcareEntry;
}

const OccupationalEntry = ({ entry }: Prop) => {
    return (
        <div>
            <p>
                {entry.date} <Icon component={WorkIcon} />
            </p>
            <p>
                {entry.description}
            </p>
            <p>
                Diagnose by: {entry.specialist}
            </p>
        </div>
    );
};

export default OccupationalEntry;