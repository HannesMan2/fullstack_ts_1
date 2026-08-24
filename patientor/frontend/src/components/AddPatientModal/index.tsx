import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert
} from "@mui/material";

import AddPatientForm from "./AddPatientForm";
import { EntryWithoutId, Diagnosis } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  diagnoses: Diagnosis[];
}

const AddPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  diagnoses
}: Props) => {
  return (
    <Dialog
      fullWidth
      open={modalOpen}
      onClose={onClose}
    >
      <DialogTitle>Add a new entry</DialogTitle>

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
          diagnoses={diagnoses}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;