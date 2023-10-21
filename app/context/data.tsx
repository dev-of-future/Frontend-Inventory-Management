'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

type DataContextType = {
  categories: any[];
  setCategories: Dispatch<SetStateAction<any[]>>;
  suppliers: any[];
  setSuppliers: Dispatch<SetStateAction<any[]>>;
};

type DataContextProviderProps = {
  children: ReactNode;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: DataContextProviderProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);

  // Fetch categories and suppliers from your API on application load
  useEffect(() => {
    // Make API requests to fetch categories and suppliers
    // Update the state using setCategories and setSuppliers
  }, []);

  return (
    <DataContext.Provider value={{
      categories, setCategories, suppliers, setSuppliers
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
