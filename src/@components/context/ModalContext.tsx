// context/ModalContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  modalHistory: string[];
  setModalHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalHistory, setModalHistory] = useState<string[]>(["/"]);

  return (
    <ModalContext.Provider value={{ modalHistory, setModalHistory }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
