"use client";

import { TaskTable } from "@/components/tasks-table";
import { dummyData } from "@/lib/data";

const TaskPage = () => {
  const { tasks } = dummyData;
  return (
    <div>
      <div className="w-full p-4">
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskPage;
