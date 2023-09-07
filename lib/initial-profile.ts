import { redirect } from "next/navigation";

import { AppData, User } from "@/types";

export const initialProfile = (data: any, user: any) => {
  const { users } = data;

  if (!user?.id) return redirect("/");

  let profile = users?.find((u: User) => u?.id === user.id);

  if (profile) return profile;

  const newProfile = {
    id: user.id,
    username: user.fullName,
    email: user.primaryEmailAddress.emailAddress,
    profilePicture: user.profileImageUrl,
    bio: "",
    tasks: [],
    teams: [],
  };

  return newProfile;
};
