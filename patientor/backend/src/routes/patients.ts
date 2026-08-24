import express from "express";
import { z } from "zod";

import patientService from "../services/patientService.ts";
import parseNewPatient, { parseEntry } from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = parseEntry(req.body);

    const addedEntry = patientService.addEntry(
      req.params.id,
      newEntry
    );

    if (!addedEntry) {
      res.sendStatus(404);
      return;
    }

    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;