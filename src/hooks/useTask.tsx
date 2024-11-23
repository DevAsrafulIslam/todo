import { useState } from "react";
import { nanoid } from "nanoid";
import { Task } from "@/types"; // Ensure you have the Task type defined

export const useTask = () => {
  // Initialize tasks state and load from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });

  const [description, setDescription] = useState("");

  // Helper to save tasks to localStorage
  const saveTasksToLocalStorage = (tasks: Task[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  // Add a new task
  const addTask = () => {
    if (description.trim() === "") return;

    const newTask = { id: nanoid(), description, completed: false };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setDescription("");
  };

  // Remove a task by its id
  const removeTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Edit a task's description
  const editTask = (id: string, newDescription: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, description: newDescription } : task
    );

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Toggle a task's status (completed or not)
  const toggleTaskStatus = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Save a task manually (optional utility function)
  const saveTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return {
    tasks,
    addTask,
    description,
    setDescription,
    removeTask,
    editTask,
    toggleTaskStatus,
    saveTask,
  };
};

// import { Task } from "@/types";
// import { useState } from "react";
// import { nanoid } from "nanoid";

// export const useTask = () => {
//   const [description, setDescription] = useState("");
//   const [tasks, setTasks] = useState<Task[]>([]);

//   // save task to local state
//   const saveTask = (task: Task) => {
//     setTasks((prev) => [...prev, task]);
//   };

//   // Add a new task
//   const addTask = () => {
//     if (description.trim() === "") return;

//     setTasks((prev) => [
//       ...prev,
//       { id: nanoid(), description, completed: false },
//     ]);
//     setDescription("");
//   };
//   // Remove a task by its id
//   const removeTask = (id: string) => {
//     setTasks((prev) => prev.filter((item) => item.id !== id));
//   };
//   // Edit a task's description
//   const editTask = (id: string, description: string) => {
//     setTasks((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, description } : item))
//     );
//   };
//   // Toggle a task's status (completed or not)
//   const toggleTaskStatus = (id: string) => {
//     setTasks((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, completed: !item.completed } : item
//       )
//     );
//   };

//   return {
//     tasks,
//     addTask,
//     description,
//     setDescription,
//     removeTask,
//     editTask,
//     toggleTaskStatus,
//     saveTask,
//   };
// };
