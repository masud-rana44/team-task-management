"use client";

import { useState, useEffect } from "react";
import { AddTaskModal } from "../modals/addTaskModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddTaskModal />
    </>
  );
};
