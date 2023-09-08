export interface User {
  id: string;
  username: string | null;
  email: string | undefined;
  profilePicture: string;
  bio: string;
  tasks: string[];
  teams: string[];
  invitations: string[];
}

export interface Team {
  id: string;
  name: string;
  creatorId: string | undefined;
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
  assignedTo?: string;
  creatorId?: string;
  teamId: string | string[];
}

export interface AppData {
  users: User[];
  teams: Team[];
  tasks: Task[];
}
