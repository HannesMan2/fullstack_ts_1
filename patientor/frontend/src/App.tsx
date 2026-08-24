import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import {
  Button,
  Divider,
  Container,
  Typography
} from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";
import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get(`${apiBaseUrl}/ping`);

    const getPatients = async () => {
      const data = await patientService.getAll();
      setPatients(data);
    };

    const getDiagnoses = async () => {
      const data = await diagnosisService.getAll();
      setDiagnoses(data);
    };

    void getPatients();
    void getDiagnoses();
  }, []);

  return (
    <Router>
      <Container>
        <Typography variant="h3">
          Patientor
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
        >
          HOME
        </Button>

        <Divider sx={{ marginY: 2 }} />

        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage
                patients={patients}
                diagnoses={diagnoses}
              />
            }
          />

          <Route
            path="/patients/:id"
            element={
              <PatientListPage
                patients={patients}
                diagnoses={diagnoses}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;