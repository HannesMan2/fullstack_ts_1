import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody
} from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import {
  Patient,
  Diagnosis,
  Entry,
  PatientFormValues
} from "../../types";

import AddPatientModal from "../AddPatientModal";
import AddEntryModal from "../AddEntryModal";
import HealthRatingBar from "../HealthRatingBar";
import EntryDetails from "../EntryDetails";
import patientService from "../../services/patients";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

const PatientListPage = ({
  patients,
  diagnoses
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [entryModalOpen, setEntryModalOpen] = useState(false);

  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const getPatient = async () => {
        const data = await patientService.getOne(id);
        setPatient(data);
      };

      void getPatient();
    }
  }, [id]);

  const submitNewPatient = async (
    values: PatientFormValues
  ) => {
    try {
      await patientService.create(values);

      setModalOpen(false);
      setError(undefined);

      window.location.reload();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError("Could not add patient");
      } else {
        setError("Unknown error");
      }
    }
  };

  const submitNewEntry = async (
    values: Omit<Entry, "id">
  ) => {
    if (!id) return;

    try {
      const newEntry = await patientService.createEntry(
        id,
        values
      );

      setPatient((currentPatient) => {
        if (!currentPatient) return currentPatient;

        return {
          ...currentPatient,
          entries: currentPatient.entries.concat(newEntry)
        };
      });

      setEntryModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError("Could not add entry");
      } else {
        setError("Unknown error");
      }
    }
  };

  if (id && patient) {
    return (
      <div>
        <Typography variant="h4">
          {patient.name}
        </Typography>

        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <p>Gender: {patient.gender}</p>
        <p>Date of birth: {patient.dateOfBirth}</p>

        <Button
          variant="contained"
          onClick={() => setEntryModalOpen(true)}
        >
          Add New Entry
        </Button>

        <Typography variant="h5" sx={{ marginTop: 3 }}>
          Entries
        </Typography>

        {patient.entries.map((entry) => (
          <Box
            key={entry.id}
            sx={{
              border: "1px solid #ccc",
              padding: 2,
              marginTop: 2
            }}
          >
            <Typography>{entry.date}</Typography>

            <Typography>
              {entry.description}
            </Typography>

            <Typography>
              Specialist: {entry.specialist}
            </Typography>

            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses.find(
                    (d) => d.code === code
                  );

                  return (
                    <li key={code}>
                      {code} {diagnosis?.name}
                    </li>
                  );
                })}
              </ul>
            )}

            <EntryDetails entry={entry} />
          </Box>
        ))}

        <AddEntryModal
          modalOpen={entryModalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={() => setEntryModalOpen(false)}
          diagnoses={diagnoses}
        />
      </div>
    );
  }

  if (id) {
    return <p>Loading patient...</p>;
  }

  return (
    <div>
      <Box>
        <Typography
          align="center"
          variant="h6"
        >
          Patient list
        </Typography>

        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{ marginY: 2 }}
        >
          Add New Patient
        </Button>
      </Box>

      <Table sx={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patients/${patient.id}`}>
                  {patient.name}
                </Link>
              </TableCell>

              <TableCell>
                {patient.gender}
              </TableCell>

              <TableCell>
                {patient.occupation}
              </TableCell>

              <TableCell>
                <HealthRatingBar
                  showText={false}
                  rating={1}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={() => {
          setModalOpen(false);
          setError(undefined);
        }}
      />
    </div>
  );
};

export default PatientListPage;