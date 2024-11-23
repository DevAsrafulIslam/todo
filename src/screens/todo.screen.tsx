"use client";

import { Input } from "@/components";
import { useTask } from "@/hooks";
import { cn } from "@/utils";
import { Check, Trash2 } from "lucide-react";
import React from "react";

export const TodoScreen = () => {
  const {
    tasks,
    addTask,
    description,
    setDescription,
    removeTask,
    editTask,
    toggleTaskStatus,
  } = useTask();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border rounded-md p-5 max-w-3xl w-full space-y-5">
        <h3 className="text-center text-3xl font-semibold">Task Manager</h3>
        <div className="flex items-center space-x-3">
          <input
            placeholder="Enter your task here..."
            type="text"
            className="py-3 px-4 border rounded w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={addTask}
            disabled={description.trim() === ""}
            className={cn(
              "py-3 px-4 border border-transparent rounded bg-black text-white font-medium transition hover:opacity-80",
              description.trim() === "" && "cursor-not-allowed"
            )}
          >
            Submit
          </button>
        </div>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={task.id} className="flex items-center space-x-3 group">
              <div
                onClick={() => toggleTaskStatus(task.id)}
                className="grid place-content-center border cursor-pointer rounded size-10"
              >
                {task.completed ? <Check size={16} /> : index + 1}
              </div>
              <Input {...{ task, editTask }} /> {/* task props*/}
              <button
                onClick={() => removeTask(task.id)}
                className="py-2 px-3 border border-transparent rounded bg-red-400 text-white font-medium transition hover:bg-red-500"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
