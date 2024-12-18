// src/types/types.ts


export interface ListData {
    id: number;
    name: string;
    cards: CardData[];
    title: string;  
  }
  
  export interface CardData {
    id: number;
    title: string;
    description?: string;
    order: number;
    listId: number;
  }

export interface BoardData {
    id: number;
    name: string;
    description: string;
    lists: ListData[];
  }
  
 export interface BoardContextType {
    boards: BoardData[];
    addBoard: (name: string, description: string) => void;
    editBoard: (id: number, updatedBoard: Partial<BoardData>) => void;
    deleteBoard: (id: number) => void;
    addList: (boardId: number, listName: string) => void;
    addCard: (boardId: number, listId: number, cardTitle: string, cardDescription: string) => void;
    deleteList: (boardId: number, listId: number) => void;
    editList: (boardId: number, listId: number, newTitle: string) => void;
    editCard: (boardId: number, listId: number, cardId: number, updates: Partial<CardData>) => void;
    deleteCard: (boardId: number, listId: number, cardId: number) => void;
  }
  