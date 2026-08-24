import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import {
  PatientFormValues,
  Gender
} from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

const AddPatientForm = ({
  onCancel,
  onSubmit
}: Props) => {
  const [name, setName] = useState("");
  const [ssn, setSsn] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState<Gender>("other");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      name,
      ssn,
      occupation,
      gender,
      dateOfBirth
    });
  };

  return (
    <form onSubmit={addPatient}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <TextField
        label="SSN"
        fullWidth
        margin="normal"
        value={ssn}
        onChange={(e) => setSsn(e.target.value)}
        required
      />

      <TextField
        label="Occupation"
        fullWidth
        margin="normal"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>

        <Select
          value={gender}
          label="Gender"
          onChange={(e) =>
            setGender(e.target.value as Gender)
          }
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Date of birth"
        type="date"
        fullWidth
        margin="normal"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        InputLabelProps={{
          shrink: true
        }}
        required
      />

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

        <Button
          type="submit"
          variant="contained"
        >
          Add
        </Button>
      </Grid>
    </form>
  );
};

export default AddPatientForm;