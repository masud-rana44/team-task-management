"use client";

import { AppData } from "@/types";
import { useEffect, useState } from "react";

const getData = (): AppData | null => {
  const data = localStorage.getItem("appData");
  return data ? JSON.parse(data) : null;
};

export const useData = () => {
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("appData");
    console.log(data);

    if (data) {
      setAppData(JSON.parse(data));
    }
  }, []);

  return appData;
};
