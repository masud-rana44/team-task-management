"use client";

import { InvitationTable } from "@/components/invitation-table";
import { useDataContext } from "@/contexts/data-context";
import { useUser } from "@clerk/nextjs";

const InvitationPage = () => {
  const { appData } = useDataContext();
  const { user } = useUser();

  const currentUser = appData.users.find((u) => u.id === user?.id);
  const invitedTeams = appData.teams.filter(
    (team) => currentUser?.invitations.includes(team.id),
  );

  return (
    <div className="mx-auto max-w-[700px] pt-8">
      <InvitationTable teams={invitedTeams} />
    </div>
  );
};

export default InvitationPage;
