"use client";

import { AppData } from "@/types";
import { useState, useEffect } from "react";

export function useLocalStorageState(initialState: AppData, key: string) {
  const [value, setValue] = useState(function () {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem("value", JSON.stringify(key));
    },
    [value, key],
  );

  return [value, setValue];
}
