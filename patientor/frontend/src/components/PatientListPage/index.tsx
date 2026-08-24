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
  Entry
} from "../../types";

import AddPatientModal from "../AddPatientModal";
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
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

      setPatient(currentPatient => {
        if (!currentPatient) return currentPatient;

        return {
          ...currentPatient,
          entries: currentPatient.entries.concat(newEntry)
        };
      });

      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (
          e.response?.data &&
          typeof e.response.data === "string"
        ) {
          setError(
            e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            )
          );
        } else {
          setError("Unrecognized axios error");
        }
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
          onClick={openModal}
          sx={{ marginTop: 2 }}
        >
          Add Entry
        </Button>

        <Typography
          variant="h5"
          sx={{ marginTop: 3 }}
        >
          Entries
        </Typography>

        {patient.entries.map(entry => (
          <Box
            key={entry.id}
            sx={{
              border: "1px solid #ccc",
              padding: 2,
              marginTop: 2
            }}
          >
            <Typography>
              {entry.date}
            </Typography>

            <Typography>
              {entry.description}
            </Typography>

            <Typography>
              Specialist: {entry.specialist}
            </Typography>

            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => {
                  const diagnosis = diagnoses.find(
                    diagnosis =>
                      diagnosis.code === code
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

        <AddPatientModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          diagnoses={diagnoses}
        />
      </div>
    );
  }

  if (id) {
    return <p>Loading patient...</p>;
  }

  return (
    <div className="App">
      <Box>
        <Typography
          align="center"
          variant="h6"
        >
          Patient list
        </Typography>
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
          {patients.map(patient => (
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
    </div>
  );
};

export default PatientListPage;