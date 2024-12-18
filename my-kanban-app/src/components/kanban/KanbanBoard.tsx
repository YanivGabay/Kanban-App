// src/components/KanbanBoard.tsx
import React from 'react';
import { Box } from '@mui/material';
import List from './List';
import AddNewList from './AddNewList';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { BoardData } from '../../types/board';
import { useBoards } from '../../context/BoardContext';

interface KanbanBoardProps {
  board: BoardData;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
  const { editBoard } = useBoards();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const lists = board?.lists || [];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = lists.findIndex(list => list.id === active.id);
      const newIndex = lists.findIndex(list => list.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newLists = [...lists];
        const [movedList] = newLists.splice(oldIndex, 1);
        newLists.splice(newIndex, 0, movedList);
        editBoard(board.id, { lists: newLists });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={lists.map(list => list.id)}
        strategy={horizontalListSortingStrategy}
      >
        <Box display="flex" overflow="auto">
          {lists.map(list => (
            <List key={list.id} list={list} boardId={board.id} />
          ))}
          <AddNewList boardId={board.id} />
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default KanbanBoard;
