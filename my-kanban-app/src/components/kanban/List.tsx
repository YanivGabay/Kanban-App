import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ListData } from '../../types/board';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBoards } from '../../context/BoardContext';

interface ListProps {
  list: ListData;
  boardId: number;
  setDraggingEnabled: (enabled: boolean) => void;
  isDraggingEnabled: boolean;
}

const List: React.FC<ListProps> = ({ list, boardId, setDraggingEnabled, isDraggingEnabled }) => {
  const { deleteList, editList } = useBoards();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ 
    id: list.id,
    disabled: !isDraggingEnabled
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setDraggingEnabled(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDraggingEnabled(true);
  };

  const handleTitleSubmit = () => {
    if (newTitle.trim() && newTitle !== list.title) {
      editList(boardId, list.id, newTitle.trim());
    } else {
      setNewTitle(list.title);
    }
    setIsEditing(false);
    setDraggingEnabled(true);
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsEditing(false);
      setNewTitle(list.title);
      setDraggingEnabled(true);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    setDraggingEnabled(false);
    handleClose();
  };

  const handleConfirmDelete = () => {
    deleteList(boardId, list.id);
    setDeleteDialogOpen(false);
    setDraggingEnabled(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDraggingEnabled(true);
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...(isDraggingEnabled ? attributes : {})}
      {...(isDraggingEnabled ? listeners : {})}
      sx={{ 
        minWidth: 280,
        maxWidth: 280,
        m: 1,
        height: 'fit-content'
      }}
    >
      <Paper 
        elevation={1}
        sx={{ 
          p: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: '#e0e0e0',
          }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          {isEditing ? (
            <TextField
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={handleTitleKeyPress}
              size="small"
              autoFocus
              onClick={(e) => e.stopPropagation()}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#1a1a1a',
                  fontSize: '1rem',
                  fontWeight: 600,
                },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                }
              }}
            />
          ) : (
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: '1rem',
                fontWeight: 600,
                color: '#1a1a1a',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
                setDraggingEnabled(false);
              }}
            >
              {list.title}
            </Typography>
          )}
          <IconButton 
            size="small" 
            onClick={handleClick}
            onMouseDown={(e) => e.stopPropagation()}
            sx={{
              color: '#666666',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                color: '#333333',
              }
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={(e) => e.stopPropagation()}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              zIndex: 1500,
              '& .MuiPaper-root': {
                minWidth: 120,
                mt: 1,
                boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
              }
            }}
            keepMounted={false}
            disablePortal={false}
          >
            <MenuItem 
              onClick={handleDeleteClick}
              sx={{ color: 'error.main' }}
              disableRipple
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Delete List
            </MenuItem>
          </Menu>
        </Box>
        <Box
          sx={{
            minHeight: 30,
            maxHeight: 'calc(100vh - 290px)',
            overflowY: 'auto'
          }}
        >
          {/* Cards will be added here */}
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        onClick={(e) => e.stopPropagation()}
        sx={{
          zIndex: 9999,
          '& .MuiDialog-paper': {
            minWidth: 300,
            backgroundColor: 'white',
          }
        }}
        slotProps={{
          backdrop: {
            onClick: (e) => {
              e.stopPropagation();
              handleCancelDelete();
            }
          }
        }}
      >
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <Typography color="grey.800">
            Are you sure you want to delete "{list.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleCancelDelete();
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleConfirmDelete();
            }}
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

export default List;
