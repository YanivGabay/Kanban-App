import React, { useState } from 'react';
import { Box, Button, TextField, Paper, IconButton } from '@mui/material';
import { useBoards } from '../../context/BoardContext';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface AddNewListProps {
  boardId: number;
}

const AddNewList: React.FC<AddNewListProps> = ({ boardId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState('');
  const { addList } = useBoards();

  const handleSubmit = () => {
    if (listName.trim()) {
      addList(boardId, listName);
      setListName('');
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
    }
  };

  return (
    <Box sx={{ minWidth: 280, maxWidth: 280, m: 1 }}>
      {isAdding ? (
        <Paper 
          sx={{ 
            p: 2,
            backgroundColor: 'grey.50',
            borderRadius: 2
          }}
        >
          <TextField
            fullWidth
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list title"
            size="small"
            autoFocus
            onKeyDown={handleKeyPress}
            sx={{ 
              mb: 1,
              '& .MuiInputBase-input': {
                color: 'grey.900',
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'grey.500',
                opacity: 1,
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              size="small"
              startIcon={<AddIcon />}
            >
              Add List
            </Button>
            <IconButton 
              size="small" 
              onClick={() => setIsAdding(false)}
              sx={{ color: 'grey.500' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
            color: 'grey.900',
            textTransform: 'none',
            py: 1
          }}
        >
          Add New List
        </Button>
      )}
    </Box>
  );
};

export default AddNewList; 