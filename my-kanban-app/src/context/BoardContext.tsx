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
      { id: 1, name: 'Project Alpha', description: 'Initial phase management.' },
      { id: 2, name: 'Project Beta', description: 'Development phase tasks.' },
      { id: 3, name: 'Project Gamma', description: 'Testing and deployment tasks.' },
    ];
    setBoards(initialBoards);
  }, []);

  const addBoard = (name: string, description: string) => {
    const newId = boards.length > 0 ? Math.max(...boards.map((board) => board.id)) + 1 : 1;
    const newBoard = { id: newId, name, description };
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

  return (
    <BoardContext.Provider value={{ boards, addBoard, editBoard, deleteBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoards = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoards must be used within a BoardProvider');
  }
  return context;
};
