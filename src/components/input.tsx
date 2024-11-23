import { Task } from "@/types";
import { cn } from "@/utils";
import React, { useState } from "react";

interface Props {
  task: Task;
  editTask: (id: string, description: string) => void;
}

export const Input = ({ task, editTask }: Props) => {
  const [readOnly, setReadOnly] = useState(true);

  return (
    <input
      type="text"
      {...{ readOnly }}
      onChange={(e) => editTask(task.id, e.target.value)}
      value={task.description}
      onDoubleClick={() => setReadOnly(false)}
      onBlur={() => setReadOnly(true)}
      className={cn(
        "py-2 px-3 border-none group-hover:bg-gray-50 bg-transparent focus:outline-none rounded w-full",
        task.completed && "line-through"
      )}
    />
  );
};
