"use client";
import React from "react";
import TodoForm from "./TodoForm";
import { TodoItem } from "../components/ServerComponent";

const fetchTasks = async () => {
  try {
    const res = await fetch(`/api/mytasks`, {
      cache: "no-cache",
    });
    const data = await res.json();
    if (!data.success) return [];

    return data.tasks;
  } catch (error) {
    return [];
  }
};

const Page = async () => {
  const todos = await fetchTasks();

  return (
    <div className="container">
      <TodoForm />

      <section className="todosContainer">
        {todos && todos.length > 0 ? (
          todos.map((item) => (
            <TodoItem
              key={item._id}
              title={item.title}
              description={item.description}
              id={item._id}
              completed={item.isCompleted}
            />
          ))
        ) : (
          <h1>No tasks yet !</h1>
        )}
      </section>
    </div>
  );
};

export default Page;
