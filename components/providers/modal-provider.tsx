"use client";

import { useState, useEffect } from "react";
import { AddTaskModal } from "../modals/add-task-modal";
import { InitialModal } from "../modals/initial-modal";

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
