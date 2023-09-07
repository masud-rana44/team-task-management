"use client";

import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { appData } from "@/lib/getOrSetData";
import { initialProfile } from "@/lib/initial-profile";
import { useUser } from "@clerk/nextjs";

const Home = () => {
  const { user } = useUser();
  const [data, setData] = useLocalStorageState(appData, "appData");

  const profile = initialProfile(data, user);

  return <main>Task Management</main>;
};

export default Home;
