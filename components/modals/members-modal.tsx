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
import { useParams } from "next/navigation";
import { useDataContext } from "@/contexts/data-context";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";

export const MembersModal = () => {
  const params = useParams();
  const { isOpen, onClose, type } = useModal();
  const { appData, setAppData } = useDataContext();
  const { user } = useUser();

  const isModalOpen = isOpen && type === "members";

  if (!params.teamId) return null;

  let teamId: string;
  if (Array.isArray(params.teamId)) {
    teamId = params.teamId[0];
  } else {
    teamId = params.teamId;
  }

  const handleClick = (id: string) => {
    const currentUser = appData.users.find((u) => u.id === id);
    if (currentUser && !currentUser?.invitations.includes(teamId)) {
      currentUser?.invitations.push(teamId);
      const otherUsers = appData.users.filter(
        (user) => user.id !== currentUser?.id,
      );
      setAppData({ ...appData, users: [...otherUsers, currentUser] });
    }
  };

  const otherMembers = appData.users.filter((u) => !u.teams.includes(teamId));

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white  text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-bold text-center text-2xl">
            Invite Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {otherMembers.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {otherMembers.length === 0 && (
            <p className="w-full text-center text-sm text-zinc-500">
              No available members
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
                        invite
                      </Button>
                    ) : (
                      <span className="text-sm text-zinc-500">invited</span>
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
