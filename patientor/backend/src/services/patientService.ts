import patients from "../../data/patients.ts";

import { v1 as uuid } from "uuid";

import type {
  Patient,
  NewPatient,
  NonSensitivePatient,
  Entry,
  EntryWithoutId,
} from "../types.ts";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (
  patientId: string,
  entry: EntryWithoutId
): Entry | undefined => {
  const patient = patients.find(
    (patient) => patient.id === patientId
  );

  if (!patient) {
    return undefined;
  }

  const newEntry = {
    ...entry,
    id: uuid(),
  } as Entry;

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  findById,
  addPatient,
  addEntry,
};