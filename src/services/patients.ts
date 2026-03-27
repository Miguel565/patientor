import axios from "axios";
import { Patient, PatientFormValues, EntryFormValues, Entry } from "../types";

//import { apiBaseUrl } from "../constants";

const apiBaseUrl = '/api/patients/';

const getAllPatients = async () => {
  const response = await axios.get<Patient[]>(
    `${apiBaseUrl}`
  );

  return response.data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/${id}`);
  return data;
}; 

const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}`,
    object
  );

  return data;
};

const createEntry = async (patientId: string, entry: EntryFormValues) => {
  const { data } = await axios.post<Entry[]>(
    `${apiBaseUrl}/${patientId}/entries`,
    entry
  );
  return data;
};

export default {
  getAllPatients, 
  createPatient,
  getPatient,
  createEntry
};

