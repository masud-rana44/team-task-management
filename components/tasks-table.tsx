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
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { useDataContext } from "@/contexts/data-context";
import { UserAvatar } from "./user-avater";

interface TaskTableProps {
  tasks: Task[];
}

export const TaskTable = ({ tasks }: TaskTableProps) => {
  const { onOpen } = useModal();
  const { appData, setAppData } = useDataContext();

  const findUserUrl = (id: string) => {
    const user = appData.users.find((user) => user.id === id);
    return user?.profilePicture;
  };

  const findUserName = (id: string) => {
    const user = appData.users.find((user) => user.id === id);
    return user?.username;
  };

  if (!tasks.length) {
    return (
      <p className="flex h-40 w-full items-center justify-center text-[#a2a0a2]">
        No task found
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>All Tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[450px]">Task name</TableHead>
          <TableHead className="w-[250px]">Assignee</TableHead>
          <TableHead className="w-[200px]">Due date</TableHead>
          <TableHead className="w-[150px]">Priority</TableHead>
          <TableHead className="w-[150px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task: Task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell className="text-center">
              {!task.assignedTo ? (
                <button
                  onClick={() =>
                    onOpen("assignMember", {
                      teamId: task.teamId,
                      taskId: task.id,
                    })
                  }
                  className="flex items-center justify-center rounded-full border border-zinc-500 outline-none hover:bg-zinc-500"
                >
                  <Plus className="h-7 w-7 p-1" />
                </button>
              ) : (
                <p>
                  {
                    <div className="flex items-center gap-2">
                      <UserAvatar src={findUserUrl(task.assignedTo)} />
                      <p>{findUserName(task.assignedTo)}</p>
                    </div>
                  }
                </p>
              )}
            </TableCell>
            <TableCell>
              {format(new Date(task.dueDate), "dd LLL yyyy")}
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
