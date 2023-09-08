import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDataContext } from "@/contexts/data-context";

import { Team } from "@/types";
import { useUser } from "@clerk/nextjs";

import { Check, X } from "lucide-react";

interface InvitationTableProps {
  teams: Team[];
}

export const InvitationTable = ({ teams }: InvitationTableProps) => {
  const { appData, setAppData } = useDataContext();
  const { user } = useUser();

  const onAccept = (id: string) => {
    const team = appData.teams.find((teams) => teams.id === id);
    const currentUser = appData.users.find((u) => u.id === user?.id);

    if (!user || !team || !currentUser) return;

    if (!team?.members.includes(user.id)) {
      team?.members.push(user.id);
    }
    if (!currentUser?.teams.includes(id)) {
      currentUser?.teams.push(id);
    }
    currentUser.invitations = currentUser?.invitations.filter(
      (invId) => invId !== id,
    );

    const otherTeams = appData.teams.filter((t) => t.id !== team?.id);
    const otherUsers = appData.users.filter(
      (user) => user.id !== currentUser?.id,
    );
    setAppData({
      ...appData,
      teams: [...otherTeams, team],
      users: [...otherUsers, currentUser],
    });
  };

  const onReject = (id: string) => {
    const currentUser = appData.users.find((u) => u.id === user?.id);

    if (!user || !currentUser) return;

    currentUser.invitations = currentUser?.invitations.filter(
      (invId) => invId !== id,
    );

    const otherUsers = appData.users.filter(
      (user) => user.id !== currentUser?.id,
    );
    setAppData({
      ...appData,
      users: [...otherUsers, currentUser],
    });
  };

  if (!teams.length) {
    return (
      <p className="flex h-40 w-full items-center justify-center text-[#a2a0a2]">
        No invitation found
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>All Invitations</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[500px]">Team name</TableHead>
          <TableHead className="w-[200px]">Accept</TableHead>
          <TableHead className="w-[200px]">Reject</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team: Team) => (
          <TableRow key={team.id}>
            <TableCell className="font-medium">{team.name}</TableCell>
            <TableCell>
              <button onClick={() => onAccept(team.id)}>
                <Check className="text-emerald-500" />
              </button>
            </TableCell>
            <TableCell>
              <button onClick={() => onReject(team.id)}>
                <X className="text-rose-500" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
