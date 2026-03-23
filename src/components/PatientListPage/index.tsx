import { useState, useEffect } from "react";
import { Box, Table, Button, TableHead, Typography, TableContainer, TableCell, TableRow, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import Notify from "../Notify";
import { apiBaseUrl } from "../../constants";

const PatientListPage = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const AllPatients = await patientService.getAllPatients();
      setPatients(AllPatients);
    };
    void fetchPatientList();
  }, []);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.createPatient(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <Box>
        <Typography align="center" variant="h5">
          Patient list
        </Typography>
      </Box>
      <Notify setMessage={setError} message={error} />
      <TableContainer>
        <Table style={{ marginBottom: "1em" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Health Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(patients).map(patient => 
              <TableRow key={patient.id} >
                <TableCell>
                  <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.occupation}</TableCell>
                <TableCell>
                  <HealthRatingBar showText={false} rating={1} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;