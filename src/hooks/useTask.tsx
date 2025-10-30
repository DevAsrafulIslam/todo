"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Task, TaskStatus, TaskLocation } from "@/types";

export const useTask = () => {
  // Initialize tasks state and load from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        // Ensure all tasks have the required properties
        const parsedTasks = JSON.parse(savedTasks);
        return parsedTasks.map((task: Task) => ({
          id: task.id || nanoid(),
          description: task.description || "",
          completed: task.completed || false,
          category: task.category || "Uncategorized",
          imageUrl: task.imageUrl,
          status: task.status || "not_started",
          location: task.location || "home",
          shared: task.shared || false,
          sharedWith: task.sharedWith || []
        }));
      }
      return [];
    }
    return [];
  });

  // State for task inputs
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<TaskStatus>("not_started");
  const [location, setLocation] = useState<TaskLocation>("home");

  // State for categories management
  const [categories, setCategories] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedCategories = localStorage.getItem("categories");
      return savedCategories ? JSON.parse(savedCategories) : ["Personal", "Work", "Shopping"];
    }
    return ["Personal", "Work", "Shopping"];
  });

  // Helper to save tasks to localStorage
  const saveTasksToLocalStorage = (tasks: Task[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  // Helper to save categories to localStorage
  const saveCategoriesToLocalStorage = (categories: string[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  };

  // Add a new task with all properties
  const addTask = () => {
    if (description.trim() === "") return;

    const newTask: Task = {
      id: nanoid(),
      description,
      completed: false,
      category: category || "Uncategorized",
      imageUrl,
      status,
      location,
      shared: false,
      sharedWith: []
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);

    // Reset form fields
    setDescription("");
    setImageUrl(undefined);
    setStatus("not_started");
  };

  // Add a new category
  const addCategory = (newCategory: string) => {
    if (newCategory.trim() === "" || categories.includes(newCategory)) return;

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    saveCategoriesToLocalStorage(updatedCategories);
  };

  // Remove a category
  const removeCategory = (categoryToRemove: string) => {
    const updatedCategories = categories.filter(cat => cat !== categoryToRemove);
    setCategories(updatedCategories);
    saveCategoriesToLocalStorage(updatedCategories);
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

  // Update task image
  const updateTaskImage = (id: string, newImageUrl: string | undefined) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, imageUrl: newImageUrl } : task
    );

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Update task category
  const updateTaskCategory = (id: string, newCategory: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, category: newCategory } : task
    );

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Update task status
  const updateTaskStatus = (id: string, newStatus: TaskStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Update task location
  const updateTaskLocation = (id: string, newLocation: TaskLocation) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, location: newLocation } : task
    );

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Toggle a task's completed status
  const toggleTaskStatus = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Toggle task sharing status
  const toggleTaskSharing = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, shared: !task.shared } : task
    );

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Add a person to share with
  const shareTaskWith = (id: string, email: string) => {
    if (!email || !email.includes('@')) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const currentSharedWith = task.sharedWith || [];
        if (!currentSharedWith.includes(email)) {
          return {
            ...task,
            shared: true,
            sharedWith: [...currentSharedWith, email]
          };
        }
      }
      return task;
    });

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Remove a person from sharing
  const removeShareWith = (id: string, email: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id && task.sharedWith) {
        const updatedSharedWith = task.sharedWith.filter(e => e !== email);
        return {
          ...task,
          shared: updatedSharedWith.length > 0,
          sharedWith: updatedSharedWith
        };
      }
      return task;
    });

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
    categories,
    addTask,
    addCategory,
    removeCategory,
    description,
    setDescription,
    category,
    setCategory,
    imageUrl,
    setImageUrl,
    status,
    setStatus,
    location,
    setLocation,
    removeTask,
    editTask,
    updateTaskImage,
    updateTaskCategory,
    updateTaskStatus,
    updateTaskLocation,
    toggleTaskStatus,
    toggleTaskSharing,
    shareTaskWith,
    removeShareWith,
    saveTask,
  };
};

