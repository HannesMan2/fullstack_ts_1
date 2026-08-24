import {
  Typography,
  Box
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

import type { Entry } from "../../types";

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <Box sx={{ marginTop: 1 }}>
          <FavoriteIcon
            sx={{
              color:
                entry.healthCheckRating === 0
                  ? "green"
                  : entry.healthCheckRating === 1
                  ? "yellow"
                  : entry.healthCheckRating === 2
                  ? "orange"
                  : "red"
            }}
          />
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box sx={{ marginTop: 1 }}>
          <Typography>
            <WorkIcon sx={{ verticalAlign: "middle", marginRight: 1 }} />
            {entry.employerName}
          </Typography>

          {entry.sickLeave && (
            <Typography>
              Sick leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </Typography>
          )}
        </Box>
      );

    case "Hospital":
      return (
        <Box sx={{ marginTop: 1 }}>
          <Typography>
            <LocalHospitalIcon
              sx={{
                verticalAlign: "middle",
                marginRight: 1
              }}
            />
            Hospital
          </Typography>

          <Typography>
            Discharge: {entry.discharge.date}
          </Typography>

          <Typography>
            Criteria: {entry.discharge.criteria}
          </Typography>
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type: ${JSON.stringify(value)}`
  );
};

export default EntryDetails;