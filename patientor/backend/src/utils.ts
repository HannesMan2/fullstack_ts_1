import { z } from "zod";

import {
  Gender,
  HealthCheckRating,
  type NewPatient,
  type EntryWithoutId,
} from "./types.ts";

const NewPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().min(1),
  ssn: z.string().min(1),
  gender: z.enum(Gender),
  occupation: z.string().min(1),
});

export const parseNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const BaseEntrySchema = z.object({
  description: z.string().min(1),
  date: z.string().min(1),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().min(1),
    criteria: z.string().min(1),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1),
  sickLeave: z
    .object({
      startDate: z.string().min(1),
      endDate: z.string().min(1),
    })
    .optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

export const parseEntry = (object: unknown): EntryWithoutId => {
  return EntrySchema.parse(object) as EntryWithoutId;
};

export default parseNewPatient;