'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

type DataContextType = {
  contextCategories: any[];
  setContextCategories: Dispatch<SetStateAction<any[]>>;
  suppliers: any[];
  setSuppliers: Dispatch<SetStateAction<any[]>>;
};

type DataContextProviderProps = {
  children: ReactNode;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: DataContextProviderProps) => {
  const [contextCategories, setContextCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);

  return (
    <DataContext.Provider value={{
      contextCategories, setContextCategories, suppliers, setSuppliers
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType | undefined => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};
