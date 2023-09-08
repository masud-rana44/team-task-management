"use client";

import { useState, useEffect } from "react";
import { AddTaskModal } from "../modals/add-task-modal";
import { CreateTeamModal } from "../modals/create-team-modal";
import { MembersModal } from "../modals/members-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddTaskModal />
      <CreateTeamModal />
      <MembersModal />
    </>
  );
};
