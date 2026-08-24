import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert
} from "@mui/material";

import AddEntryForm from "./AddEntryForm";
import { EntryWithoutId, Diagnosis } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
  error?: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  diagnoses,
  error
}: Props) => (
  <Dialog
    fullWidth
    open={modalOpen}
    onClose={onClose}
  >
    <DialogTitle>Add New Entry</DialogTitle>

    <Divider />

    <DialogContent>
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
        diagnoses={diagnoses}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;