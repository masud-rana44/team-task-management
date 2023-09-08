"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avater";
import { useDataContext } from "@/contexts/data-context";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { fi } from "date-fns/locale";
import { User } from "@/types";

export const AssignMemberModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { appData, setAppData } = useDataContext();
  const { user } = useUser();

  const { teamId, taskId } = data;

  const isModalOpen = isOpen && type === "assignMember";

  if (!teamId || !taskId) return null;

  const team = appData.teams.find((team) => team.id === teamId);

  const members = appData.users.filter(
    (user) => team?.members.includes(user.id),
  );

  const otherMembers = members.filter((u) => u.id !== user?.id);

  const handleClick = (id: string) => {
    const task = appData.tasks.find((task) => task.id === taskId);

    if (!task) return null;

    task.assignedTo = id;

    const otherTask = appData.tasks.filter((t) => t.id !== task.id);
    setAppData({ ...appData, tasks: [...otherTask, task] });
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white  text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-bold text-center text-2xl">
            Assign team members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {otherMembers.length} team Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {otherMembers.length === 0 && (
            <p className="w-full text-center text-sm text-zinc-500">
              No available team members
            </p>
          )}
          {otherMembers.length > 0 &&
            otherMembers?.map((member) => (
              <div key={member.id} className="mb-6 flex items-center gap-x-2">
                <UserAvatar src={member.profilePicture} />
                <div className="flex flex-col gap-y-1">
                  <div className="flex items-center gap-x-1 text-xs font-semibold">
                    {member.username}
                  </div>
                  <p className="text-xs text-zinc-500">{member.email}</p>
                </div>

                {user?.id !== member.id && (
                  <div className="ml-auto mr-2">
                    {!member.invitations.includes(teamId) ? (
                      <Button
                        variant="brand"
                        size="sm"
                        onClick={() => handleClick(member.id)}
                      >
                        Assign
                      </Button>
                    ) : (
                      <span className="text-sm text-zinc-500">Assigned</span>
                    )}
                  </div>
                )}
              </div>
            ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
