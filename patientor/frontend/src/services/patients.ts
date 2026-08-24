import axios from "axios";

import { apiBaseUrl } from "../constants";
import {
  Patient,
  PatientFormValues,
  Entry
} from "../types";

const getAll = async (): Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (
  object: PatientFormValues
): Promise<Patient> => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (
  id: string,
  object: Omit<Entry, "id">
): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll,
  getOne,
  create,
  createEntry
};