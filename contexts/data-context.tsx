"use client";

import { AppData } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";

interface DataContextValue {
  appData: AppData;
  setAppData: (data: AppData) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [appData, setAppDataState] = useState<AppData>(() => {
    const storedData = localStorage.getItem("appData");
    return storedData
      ? JSON.parse(storedData)
      : { users: [], teams: [], tasks: [] };
  });

  const setAppData = (newData: AppData) => {
    setAppDataState(newData);
    localStorage.setItem("appData", JSON.stringify(newData));
  };

  // useEffect(() => {

  // }, [appData]);

  return (
    <DataContext.Provider value={{ appData, setAppData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
