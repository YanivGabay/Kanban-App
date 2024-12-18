import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CardData } from '../../types/board';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBoards } from '../../context/BoardContext';

interface CardProps {
  card: CardData;
  listId: number;
  boardId: number;
  setDraggingEnabled: (enabled: boolean) => void;
}

const Card: React.FC<CardProps> = ({ card, listId, boardId, setDraggingEnabled }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { editCard, deleteCard } = useBoards();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: `card-${card.id}`,
  });

  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    transition,
  } : undefined;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setDraggingEnabled(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setDraggingEnabled(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleMenuClose();
    setTimeout(() => {
      setIsEditing(true);
      setDraggingEnabled(false);
    }, 0);
  };

  const handleEditSubmit = () => {
    if (newTitle.trim() && newTitle !== card.title) {
      editCard(boardId, listId, card.id, { title: newTitle.trim() });
    } else {
      setNewTitle(card.title);
    }
    setIsEditing(false);
    setDraggingEnabled(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(card.title);
      setDraggingEnabled(true);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    deleteCard(boardId, listId, card.id);
    setDeleteDialogOpen(false);
    setDraggingEnabled(true);
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ 
        mb: 1,
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing'
        }
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 2,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: '#fafafa',
          },
          opacity: transform ? 0.5 : 1,
          border: transform ? '2px dashed #2196f3' : 'none'
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          {isEditing ? (
            <TextField
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyDown={handleKeyPress}
              autoFocus
              size="small"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#1a1a1a'
                },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                }
              }}
            />
          ) : (
            <Typography sx={{ 
              wordBreak: 'break-word',
              color: '#1a1a1a'
            }}>
              {card.title}
            </Typography>
          )}
          <IconButton 
            size="small" 
            onClick={handleMenuClick}
            sx={{ 
              ml: 1,
              color: 'grey.700',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        sx={{
          zIndex: 1500,
          '& .MuiPaper-root': {
            minWidth: 120,
            mt: 1,
            boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem 
          onClick={handleEditClick}
          disableRipple
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem 
          onClick={handleDeleteClick}
          sx={{ color: 'error.main' }}
          disableRipple
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onClick={(e) => e.stopPropagation()}
        sx={{
          zIndex: 9999,
          '& .MuiDialog-paper': {
            minWidth: 300,
            backgroundColor: 'white',
          }
        }}
      >
        <DialogContent>
          <Typography color="grey.800">
            Are you sure you want to delete this card?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Card; 