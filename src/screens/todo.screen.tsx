"use client";

import { Input } from "@/components";
import { useTask } from "@/hooks";
import { TaskLocation, TaskStatus } from "@/types";
import { cn } from "@/utils";
import { Check, Trash2, Plus, Image } from "lucide-react";
import React, { useState, useEffect } from "react";

export const TodoScreen = () => {
  const {
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
    toggleTaskStatus,
    updateTaskCategory,
    updateTaskStatus,
    updateTaskLocation,
    shareTaskWith,
    removeShareWith,
  } = useTask();

  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [sharingTaskId, setSharingTaskId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration mismatch by only rendering interactive parts on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="border rounded-md p-5 max-w-4xl mx-auto w-full space-y-5">
        <h3 className="text-center text-3xl font-semibold">Task Manager</h3>

        {/* Categories Management */}
        <div className="border-b pb-4">
          <h4 className="text-lg font-medium mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat) => (
              <div
                key={cat}
                className={cn(
                  // "px-3 py-1 rounded-full text-sm cursor-pointer flex items-center gap-1",
                  category === cat ? "bg-blue-500 text-white rounded-full flex items-center p-2" : "bg-gray-100 rounded-full flex items-center p-2"
                )}
              >
                <span onClick={() => setCategory(cat)}>{cat}</span>
                {isClient && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Are you sure you want to delete the "${cat}" category?`)) {
                        removeCategory(cat);
                        if (category === cat) {
                          setCategory("");
                        }
                      }
                    }}
                    className={cn(
                      "ml-1 text-xs rounded-full w-4 h-4 flex items-center justify-center",
                      category === cat ? "hover:bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-500"
                    )}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {isClient && (
              <button
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="px-3 py-1 rounded-full text-sm bg-gray-200 flex items-center gap-1"
              >
                <Plus size={14} /> {showAddCategory ? "Cancel" : "Add Category"}
              </button>
            )}
          </div>

          {isClient && showAddCategory && (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="New category name"
                className="py-2 px-3 border rounded"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                onClick={() => {
                  addCategory(newCategory);
                  setNewCategory("");
                  setShowAddCategory(false);
                }}
                disabled={newCategory.trim() === ""}
                className={cn(
                  "py-2 px-4 border border-transparent rounded bg-blue-500 text-white font-medium transition hover:bg-blue-600",
                  newCategory.trim() === "" && "cursor-not-allowed opacity-50"
                )}
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Task Form */}
        <div className="space-y-3 border-b pb-5">
          <h4 className="text-lg font-medium">Add New Task</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                placeholder="Enter your task here..."
                type="text"
                className="py-2 px-3 border rounded w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="py-2 px-3 border rounded w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="py-2 px-3 border rounded w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <option value="not_started">Store</option>
                <option value="in_progress">Sewing</option>
                <option value="in_progress">Wash</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Location Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <select
                className="py-2 px-3 border rounded w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value as TaskLocation)}
              >
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Image Upload and Camera */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Image (Optional)</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer py-2 px-3 border rounded flex items-center gap-2 hover:bg-gray-50">
                  <Image size={18} />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                {isClient && (
                  <button
                    onClick={() => {
                      const cameraInput = document.getElementById('camera-input') as HTMLInputElement;
                      cameraInput?.click();
                    }}
                    className="cursor-pointer py-2 px-3 border rounded flex items-center gap-2 hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                      <circle cx="12" cy="13" r="3"></circle>
                    </svg>
                    <span>Take Photo</span>
                    <input
                      id="camera-input"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </button>
                )}
                {imageUrl && (
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Task preview"
                      className="h-12 w-20 object-cover rounded"
                    />
                    {isClient && (
                      <button
                        onClick={() => setImageUrl(undefined)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={addTask}
              disabled={description.trim() === ""}
              className={cn(
                "py-2 px-4 border border-transparent rounded bg-black text-white font-medium transition hover:opacity-80",
                description.trim() === "" && "cursor-not-allowed opacity-50"
              )}
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Tasks</h4>

          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No tasks yet. Add your first task above!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-md p-3 space-y-3 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        "grid place-content-center border cursor-pointer rounded-full size-8",
                        task.completed && "bg-green-100 border-green-500"
                      )}
                    >
                      {task.completed && <Check size={16} className="text-green-500" />}
                    </div>
                    <Input {...{ task, editTask }} />
                  </div>
                  {isClient && (
                    <button
                      onClick={() => removeTask(task.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Category */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Category</label>
                    <select
                      className="py-1 px-2 border rounded w-full text-sm"
                      value={task.category}
                      onChange={(e) => updateTaskCategory(task.id, e.target.value)}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Status</label>
                    <select
                      className="py-1 px-2 border rounded w-full text-sm"
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                    >
                      <option value="not_started">Store</option>
                      <option value="in_progress">Sewing</option>
                      <option value="in_progress">Wash</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Location</label>
                    <select
                      className="py-1 px-2 border rounded w-full text-sm"
                      value={task.location}
                      onChange={(e) => updateTaskLocation(task.id, e.target.value as TaskLocation)}
                    >
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Task Image */}
                {task.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={task.imageUrl}
                      alt={task.description}
                      className="h-32 w-full object-cover rounded"
                    />
                  </div>
                )}

                {/* Share Task */}
                {isClient && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* <button
                          onClick={() => toggleTaskSharing(task.id)}
                          className={cn(
                            "text-sm py-1 px-3 rounded-full flex items-center gap-1",
                            task.shared ? "bg-blue-100 text-blue-700" : "bg-gray-100"
                          )}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                          </svg>
                          {task.shared ? "Shared" : "Share"}
                        </button> */}

                        {isClient && (
                          <button
                            onClick={() => {
                              // Create shareable text with timestamp to ensure uniqueness
                              const timestamp = new Date().toLocaleString();
                              const shareText = `Task: ${task.description}\nCategory: ${task.category}\nStatus: ${task.status.replace('_', ' ')}\nLocation: ${task.location}\nShared: ${timestamp}`;

                              // Use Web Share API if available (client-side only)
                              if (typeof window !== 'undefined') {
                                if (navigator.share) {
                                  navigator.share({
                                    title: 'Task from Task Manager',
                                    text: shareText,
                                  }).catch(err => {
                                    console.error('Error sharing:', err);
                                    // Fallback to clipboard
                                    navigator.clipboard.writeText(shareText);
                                    alert('Task copied to clipboard!');
                                  });
                                } else {
                                  // Fallback to clipboard
                                  navigator.clipboard.writeText(shareText);
                                  alert('Task copied to clipboard!');
                                }
                              }
                            }}
                            className="text-sm py-1 px-3 rounded-full bg-green-100 text-green-700 flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="18" cy="5" r="3"></circle>
                              <circle cx="6" cy="12" r="3"></circle>
                              <circle cx="18" cy="19" r="3"></circle>
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            Share Externally
                          </button>
                        )}

                        {task.shared && (
                          <button
                            onClick={() => {
                              setSharingTaskId(sharingTaskId === task.id ? null : task.id);
                              setShareEmail("");
                            }}
                            className="text-sm py-1 px-3 rounded-full bg-gray-100 md:rounded-full md:px-3"
                          >
                            {sharingTaskId === task.id ? "Cancel" : "Manage Sharing"}
                          </button>
                        )}
                      </div>

                      {task.shared && task.sharedWith && task.sharedWith.length > 0 && (
                        <div className="text-xs text-gray-500">
                          Shared with {task.sharedWith.length} {task.sharedWith.length === 1 ? "person" : "people"}
                        </div>
                      )}
                    </div>

                    {sharingTaskId === task.id && (
                      <div className="mt-3 space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            placeholder="Enter email to share with"
                            className="py-1 px-2 border rounded flex-1 text-sm"
                            value={shareEmail}
                            onChange={(e) => setShareEmail(e.target.value)}
                          />
                          <button
                            onClick={() => {
                              shareTaskWith(task.id, shareEmail);
                              setShareEmail("");
                            }}
                            disabled={!shareEmail.includes('@')}
                            className={cn(
                              "py-1 px-3 rounded bg-blue-500 text-white text-sm",
                              !shareEmail.includes('@') && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            Add
                          </button>
                        </div>

                        {task.sharedWith && task.sharedWith.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-gray-500">Shared with:</div>
                            {task.sharedWith.map((email) => (
                              <div key={email} className="flex items-center justify-between bg-gray-50 py-1 px-2 rounded text-sm">
                                <span>{email}</span>
                                <button
                                  onClick={() => removeShareWith(task.id, email)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
