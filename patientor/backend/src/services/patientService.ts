import patients from '../../data/patients.ts';
import { v1 as uuid } from 'uuid';
import type {
  Patient,
  NewPatient,
  NonSensitivePatient,
  Gender
} from '../types.ts';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender as Gender,
    occupation: patient.occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  addPatient
};