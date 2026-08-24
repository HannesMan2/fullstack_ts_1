import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert
} from "@mui/material";

import AddPatientForm from "./AddPatientForm";
import { PatientFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error
}: Props) => {
  return (
    <Dialog
      fullWidth
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="add-patient-dialog-title"
    >
      <DialogTitle id="add-patient-dialog-title">
        Add a new patient
      </DialogTitle>

      <Divider />

      <DialogContent>
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <AddPatientForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;