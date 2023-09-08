import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Task } from "@/types";

import { TaskMenu } from "./task-menu";

interface TaskTableProps {
  tasks: Task[];
}

export const TaskTable = ({ tasks }: TaskTableProps) => {
  if (!tasks.length) {
    return <p>No task found</p>;
  }

  return (
    <Table>
      <TableCaption>All Tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[500px]">Task name</TableHead>
          <TableHead className="w-[200px]">Due date</TableHead>
          <TableHead className="w-[150px]">Priority</TableHead>
          <TableHead className="w-[200px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task: Task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>
              {format(new Date(task.dueDate), "dd/MM/yyyy")}
            </TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>
              <TaskMenu />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
