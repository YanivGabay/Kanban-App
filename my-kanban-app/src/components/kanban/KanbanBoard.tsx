// src/components/KanbanBoard.tsx
import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import List from './List';
import AddNewList from './AddNewList';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors, DragEndEvent, DragStartEvent, DragOverlay, restrictToWindowEdges } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { BoardData } from '../../types/board';
import { useBoards } from '../../context/BoardContext';

interface KanbanBoardProps {
  board: BoardData;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
  const { editBoard } = useBoards();
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor)
  );

  const lists = board?.lists || [];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    
    if (!over) return;

    // Handle list reordering
    if (!active.id.toString().includes('card-')) {
      if (active.id !== over.id) {
        const oldIndex = lists.findIndex(list => list.id === active.id);
        const newIndex = lists.findIndex(list => list.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newLists = [...lists];
          const [movedList] = newLists.splice(oldIndex, 1);
          newLists.splice(newIndex, 0, movedList);
          editBoard(board.id, { lists: newLists });
        }
      }
      return;
    }

    // Handle card moving
    const cardId = parseInt(active.id.toString().replace('card-', ''));
    const sourceListId = parseInt(active.data.current?.sortable.containerId);
    const destinationListId = parseInt(over.id.toString());

    // If moving within the same list
    if (sourceListId === destinationListId) {
      const list = lists.find(l => l.id === sourceListId);
      if (list) {
        const oldIndex = list.cards.findIndex(card => card.id === cardId);
        const newIndex = list.cards.findIndex(card => card.id === parseInt(over.id.toString().replace('card-', '')));
        
        if (oldIndex !== -1 && newIndex !== -1) {
          const newCards = [...list.cards];
          const [movedCard] = newCards.splice(oldIndex, 1);
          newCards.splice(newIndex, 0, movedCard);
          
          const newLists = lists.map(l => 
            l.id === sourceListId ? { ...l, cards: newCards } : l
          );
          
          editBoard(board.id, { lists: newLists });
        }
      }
      return;
    }

    // Handle card moving between lists
    const sourceList = lists.find(list => list.id === sourceListId);
    const destinationList = lists.find(list => list.id === destinationListId);
    
    if (sourceList && destinationList) {
      const card = sourceList.cards.find(card => card.id === cardId);
      if (card) {
        const newLists = lists.map(list => {
          if (list.id === sourceListId) {
            return {
              ...list,
              cards: list.cards.filter(c => c.id !== cardId)
            };
          }
          if (list.id === destinationListId) {
            return {
              ...list,
              cards: [...list.cards, { ...card, listId: destinationListId }]
            };
          }
          return list;
        });
        
        editBoard(board.id, { lists: newLists });
      }
    }
  };

  const getCardTitle = (cardId: string) => {
    const id = parseInt(cardId.replace('card-', ''));
    for (const list of lists) {
      const card = list.cards.find(c => c.id === id);
      if (card) return card.title;
    }
    return '';
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <SortableContext
        items={lists.map(list => list.id)}
        strategy={horizontalListSortingStrategy}
      >
        <Box display="flex" overflow="auto">
          {lists.map(list => (
            <List 
              key={list.id} 
              list={list} 
              boardId={board.id}
              setDraggingEnabled={setIsDraggingEnabled}
              isDraggingEnabled={isDraggingEnabled}
            />
          ))}
          <AddNewList boardId={board.id} />
        </Box>
      </SortableContext>
      <DragOverlay>
        {activeId && activeId.includes('card-') && (
          <Paper
            elevation={6}
            sx={{
              p: 2,
              backgroundColor: 'white',
              width: '280px',
              opacity: 0.8
            }}
          >
            <Typography>
              {getCardTitle(activeId)}
            </Typography>
          </Paper>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
