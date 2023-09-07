import { AppData } from "@/types";

export const dummyData: AppData = {
  users: [
    {
      id: "user1",
      username: "john_doe",
      email: "john@example.com",
      profilePicture: "profile1.jpg",
      bio: "Software Developer",
      tasks: ["task1", "task2"],
      teams: ["team1", "team2"],
    },
    {
      id: "user2",
      username: "jane_smith",
      email: "jane@example.com",
      profilePicture: "profile2.jpg",
      bio: "Front-end Developer",
      tasks: ["task3", "task4"],
      teams: ["team1", "team3"],
    },
  ],
  teams: [
    {
      id: "team1",
      name: "Development Team",
      members: ["user1", "user2"],
      tasks: ["task1", "task3"],
    },
    {
      id: "team2",
      name: "Design Team",
      members: ["user1"],
      tasks: ["task2"],
    },
    {
      id: "team3",
      name: "Marketing Team",
      members: ["user2"],
      tasks: ["task4"],
    },
  ],
  tasks: [
    {
      id: "task1",
      title: "Develop Feature A",
      description: "Implement new feature for the app.",
      dueDate: "2023-10-15",
      priority: "high",
      status: "in_progress",
      assignedTo: "user1",
    },
    {
      id: "task2",
      title: "Design Landing Page",
      description: "Create a stunning landing page.",
      dueDate: "2023-10-20",
      priority: "medium",
      status: "pending",
      assignedTo: "user1",
    },
    {
      id: "task3",
      title: "Fix CSS Bugs",
      description: "Resolve CSS issues on the website.",
      dueDate: "2023-10-18",
      priority: "high",
      status: "in_progress",
      assignedTo: "user2",
    },
    {
      id: "task4",
      title: "Run Ad Campaign",
      description: "Launch a new advertising campaign.",
      dueDate: "2023-10-25",
      priority: "medium",
      status: "pending",
      assignedTo: "user2",
    },
  ],
};
