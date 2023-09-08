"use client";

import { TaskTable } from "@/components/tasks-table";
import { useDataContext } from "@/contexts/data-context";
import { useUser } from "@clerk/nextjs";

const TaskPage = () => {
  const { user } = useUser();
  const { appData } = useDataContext();

  const tasks = appData.tasks.filter(
    (task) => task.creatorId === user?.id || task.assignedTo === user?.id,
  );

  return (
    <div>
      <div className="w-full p-4">
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskPage;
