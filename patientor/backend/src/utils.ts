import { z } from 'zod';
import { Gender, type NewPatient } from './types.ts';

const NewPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().min(1),
  ssn: z.string().min(1),
  gender: z.enum(Gender),
  occupation: z.string().min(1),
});

const parseNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export default parseNewPatient;