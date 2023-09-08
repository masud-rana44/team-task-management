"use client";

import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { User } from "@/types";
import { useDataContext } from "@/contexts/data-context";

const SetupPage = () => {
  const { user } = useUser();
  const { appData, setAppData } = useDataContext();
  const { users, teams } = appData;

  if (!user?.id) return redirect("/");

  let profile = users?.find((u: User) => u?.id === user.id);

  if (!profile) {
    profile = {
      id: user.id,
      username: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      profilePicture: user.imageUrl,
      bio: "",
      tasks: [],
      teams: [],
      invitations: [],
    };
    console.log(profile);
    setAppData({ ...appData, users: [...appData.users, profile] });
  }

  const team = teams.find((team) =>
    team.members.find((memberId) => memberId === profile?.id),
  );

  console.log(team);

  // return <InitialModal />;

  if (team) return redirect(`/teams/${team.id}`);

  return <div>Setup Page</div>;
};

export default SetupPage;
