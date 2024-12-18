// src/context/BoardContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BoardData } from '../types/board';
import { BoardContextType } from '../types/board';

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boards, setBoards] = useState<BoardData[]>([]);

  // Initialize boards with some data
  useEffect(() => {
    const initialBoards: BoardData[] = [
      { 
        id: 1, 
        name: 'Project Alpha', 
        description: 'Initial phase management.',
        lists: [] 
      },
      { 
        id: 2, 
        name: 'Project Beta', 
        description: 'Development phase tasks.',
        lists: [] 
      },
      { 
        id: 3, 
        name: 'Project Gamma', 
        description: 'Testing and deployment tasks.',
        lists: [] 
      },
    ];
    setBoards(initialBoards);
  }, []);

  const addBoard = (name: string, description: string) => {
    const newId = boards.length > 0 ? Math.max(...boards.map((board) => board.id)) + 1 : 1;
    const newBoard = { id: newId, name, description, lists: [] };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

  const editBoard = (id: number, updatedBoard: Partial<BoardData>) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => (board.id === id ? { ...board, ...updatedBoard } : board))
    );
  };

  const deleteBoard = (id: number) => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
  };

  const addList = (boardId: number, listName: string) => {
    setBoards(prevBoards => {
      return prevBoards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: [
              ...board.lists,
              {
                id: Date.now(), // Simple way to generate unique id
                name: listName,
                title: listName,
                cards: []
              }
            ]
          };
        }
        return board;
      });
    });
  };

  const addCard = (boardId: number, listId: number, cardTitle: string, cardDescription: string) => {
    setBoards(prevBoards => {
      return prevBoards.map(board => {
        if (board.id === boardId) {
          const newLists = board.lists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                cards: [
                  ...list.cards,
                  {
                    id: Date.now(),
                    title: cardTitle,
                    description: cardDescription
                  }
                ]
              };
            }
            return list;
          });
          return { ...board, lists: newLists };
        }
        return board;
      });
    });
  };

  const value = {
    boards,
    addBoard,
    editBoard,
    deleteBoard,
    addList,
    addCard
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoards = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoards must be used within a BoardProvider');
  }
  return context;
};
