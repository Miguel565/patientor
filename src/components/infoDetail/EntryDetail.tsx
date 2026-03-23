import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalEntry from "./OccupationalEntry";
import { Entry } from "../../types";

interface Prop {
    entry: Entry;
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated component member: ${JSON.stringify(value)}`);
}

const EntryDetails = ({ entry }: Prop) => {
    const handleEntryType = (entry: Entry) => {
        switch (entry.type) {
            case "Hospital":
                return <HospitalEntry entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalEntry entry={entry}/>;
            case "HealthCheck":
                return <HealthCheckEntry entry={entry} />;
            default:
                return assertNever(entry);
        }
    };

    return <div>{handleEntryType(entry)}</div>
}

export default EntryDetails;