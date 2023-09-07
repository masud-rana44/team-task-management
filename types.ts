export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  bio: string;
  tasks: string[];
  teams: string[];
}

export interface Team {
  id: string;
  name: string;
  members: string[];
  tasks: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "completed" | "in_progress" | "pending";
  assignedTo: string;
}

export interface AppData {
  users: User[];
  teams: Team[];
  tasks: Task[];
}
