"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const TodoForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const addTaskHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/newtask", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      setTitle("");
      setDescription("");
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="login">
      <section>
        <form onSubmit={addTaskHandler}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Task Description"
          />

          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default TodoForm;
