// src/types/types.ts
export interface BoardData {
    id: number;
    name: string;
    description: string;
  }
  
 export interface BoardContextType {
    boards: BoardData[];
    addBoard: (name: string, description: string) => void;
    editBoard: (id: number, updatedBoard: Partial<BoardData>) => void;
    deleteBoard: (id: number) => void;
  }
  