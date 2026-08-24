import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

import {
  EntryWithoutId,
  HealthCheckRating,
  Diagnosis
} from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({
  onCancel,
  onSubmit,
  diagnoses
}: Props) => {
  const [type, setType] = useState("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const [employerName, setEmployerName] = useState("");
  const [sickStart, setSickStart] = useState("");
  const [sickEnd, setSickEnd] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const base = {
      date,
      description,
      specialist,
      diagnosisCodes
    };

    if (type === "HealthCheck") {
      onSubmit({
        ...base,
        type: "HealthCheck",
        healthCheckRating
      });
    }

    if (type === "OccupationalHealthcare") {
      onSubmit({
        ...base,
        type: "OccupationalHealthcare",
        employerName,
        ...(sickStart && sickEnd
          ? {
              sickLeave: {
                startDate: sickStart,
                endDate: sickEnd
              }
            }
          : {})
      });
    }

    if (type === "Hospital") {
      onSubmit({
        ...base,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      });
    }
  };

  return (
    <form onSubmit={addEntry}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Entry type</InputLabel>

        <Select
          value={type}
          label="Entry type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="HealthCheck">
            Health Check
          </MenuItem>

          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>

          <MenuItem value="Hospital">
            Hospital
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <TextField
        label="Specialist"
        fullWidth
        margin="normal"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Diagnosis codes</InputLabel>

        <Select
          multiple
          value={diagnosisCodes}
          label="Diagnosis codes"
          onChange={(e) => {
            const value = e.target.value;

            setDiagnosisCodes(
              typeof value === "string"
                ? value.split(",")
                : (value as string[])
            );
          }}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
            >
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {type === "HealthCheck" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Health rating</InputLabel>

          <Select
            value={healthCheckRating}
            label="Health rating"
            onChange={(e) =>
              setHealthCheckRating(
                Number(e.target.value) as HealthCheckRating
              )
            }
          >
            <MenuItem value={0}>0 - Healthy</MenuItem>
            <MenuItem value={1}>1 - Low Risk</MenuItem>
            <MenuItem value={2}>2 - High Risk</MenuItem>
            <MenuItem value={3}>3 - Critical Risk</MenuItem>
          </Select>
        </FormControl>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer name"
            fullWidth
            margin="normal"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            required
          />

          <TextField
            label="Sick leave start"
            type="date"
            fullWidth
            margin="normal"
            value={sickStart}
            onChange={(e) => setSickStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Sick leave end"
            type="date"
            fullWidth
            margin="normal"
            value={sickEnd}
            onChange={(e) => setSickEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

      {type === "Hospital" && (
        <>
          <TextField
            label="Discharge date"
            type="date"
            fullWidth
            margin="normal"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            label="Discharge criteria"
            fullWidth
            margin="normal"
            value={dischargeCriteria}
            onChange={(e) =>
              setDischargeCriteria(e.target.value)
            }
            required
          />
        </>
      )}

      <Grid
        container
        justifyContent="space-between"
        sx={{ marginTop: 2 }}
      >
        <Button
          color="secondary"
          variant="contained"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" variant="contained">
          Add
        </Button>
      </Grid>
    </form>
  );
};

export default AddEntryForm;