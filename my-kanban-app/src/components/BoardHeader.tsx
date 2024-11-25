import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';


interface HeaderProps {
    onAdd: () => void;
    onEdit: () => void;
    onDelete: () => void;
}


const BoardHeader: React.FC<HeaderProps> = ({ onAdd,onEdit,onDelete}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Your Boards
                </Typography>
                <IconButton color="inherit" onClick={onAdd}>
                    <AddIcon />
                </IconButton>
                <IconButton color="inherit" onClick={onEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton color="inherit" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );

}

export default BoardHeader