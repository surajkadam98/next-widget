// context/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  modalHistory: string[];
  currentUrl: string;
  navigateModal: (route: string) => void; // Function to change modal route
  setModalHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalHistory, setModalHistory] = useState<string[]>(["/"]);
  const [currentUrl, setCurrentUrl] = useState("/");

  const navigateModal = (route: string) => {
    setCurrentUrl(route);
    setModalHistory((prev) => [...prev, route]); // Simulate navigation
  };

  return (
    <ModalContext.Provider value={{ modalHistory, currentUrl, navigateModal, setModalHistory }}>
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
