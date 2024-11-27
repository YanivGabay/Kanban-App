// src/components/AddBoard.tsx
import React, { useState } from 'react';
import { useBoards } from '../context/BoardContext';
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  Button,
} from '@mui/material';

const AddBoard: React.FC = () => {
  const { addBoard } = useBoards();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
  };

  const handleAdd = () => {
    if (name.trim() && description.trim()) {
      addBoard(name, description);
      handleClose();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={() => setOpen(true)}>
        Add Board
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Board Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Board Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddBoard;
