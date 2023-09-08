"use client";

import { TaskTable } from "@/components/tasks-table";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/contexts/data-context";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

interface TeamIdPageProps {
  params: {
    teamId: string;
  };
}

const TeamIdPage = ({ params }: TeamIdPageProps) => {
  const { appData } = useDataContext();
  const { onOpen } = useModal();

  const team = appData.teams.find((team) => team.id === params.teamId);
  const teamTasks = appData.tasks.filter(
    (task) => team?.tasks.includes(task.id),
  );

  return (
    <div>
      <div className="ml-8 mt-4 w-full">
        <Button onClick={() => onOpen("addTask")} variant="brand">
          <Plus className="mr-1 h-4 w-4" />
          <span>Add task</span>
        </Button>
      </div>
      <div className="w-full p-4">
        <TaskTable tasks={teamTasks} />
      </div>
    </div>
  );
};

export default TeamIdPage;
