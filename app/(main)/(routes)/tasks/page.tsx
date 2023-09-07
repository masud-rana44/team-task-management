import { TaskTable } from "@/components/tasks-table";
import { Button } from "@/components/ui/button";
import { dummyData } from "@/lib/data";

import { Plus } from "lucide-react";

const TaskPage = () => {
  const { tasks } = dummyData;
  return (
    <div>
      <div className="ml-8 mt-4 w-full">
        <Button className="bg-[#dc4c3e]/90 text-white hover:bg-[#dc4c3e] ">
          <Plus className="mr-1 h-4 w-4" />
          <span>Add task</span>
        </Button>
      </div>
      <div className="w-full p-4">
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskPage;