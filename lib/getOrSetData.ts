interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  tasks: string[];
  teams: string[];
}

interface Team {
  id: string;
  name: string;
  members: string[];
  tasks: string[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "completed" | "in_progress" | "pending";
  assignedTo: string;
}

interface AppData {
  users: User[];
  teams: Team[];
  tasks: Task[];
}

export let appData: AppData = {
  users: [],
  teams: [],
  tasks: [],
};

export const getData = (): AppData | null => {
  const data = localStorage.getItem("appData");
  return data ? JSON.parse(data) : null;
};

export const setData = (data: AppData) => {
  const newData = { ...appData, ...data };
  localStorage.setItem("appData", JSON.stringify(newData));
};
