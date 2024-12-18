import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Paper,
  Collapse,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useBoards } from '../../context/BoardContext';

interface AddCardProps {
  listId: number;
  boardId: number;
  setDraggingEnabled: (enabled: boolean) => void;
}

const AddCard: React.FC<AddCardProps> = ({ listId, boardId, setDraggingEnabled }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const { addCard } = useBoards();

  const handleAddClick = () => {
    setIsAdding(true);
    setDraggingEnabled(false);
  };

  const handleClose = () => {
    setIsAdding(false);
    setCardTitle('');
    setDraggingEnabled(true);
  };

  const handleSubmit = () => {
    if (cardTitle.trim()) {
      addCard(boardId, listId, cardTitle.trim(), '');
      setCardTitle('');
      setIsAdding(false);
      setDraggingEnabled(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Collapse in={isAdding}>
        <Paper sx={{ p: 2, mb: 1, backgroundColor: 'white' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Enter a title for this card..."
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            size="small"
            sx={{ 
              mb: 1,
              '& .MuiInputBase-input': {
                color: '#1a1a1a'
              }
            }}
          />
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              size="small"
              onClick={handleSubmit}
            >
              Add Card
            </Button>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>
      </Collapse>
      
      {!isAdding && (
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            color: 'grey.700',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          Add a card
        </Button>
      )}
    </Box>
  );
};

export default AddCard; 