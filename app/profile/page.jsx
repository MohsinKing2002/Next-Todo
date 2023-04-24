"use client";
import React, { useContext } from "react";
import { Context } from "../../components/Clients";

const Page = () => {
  const { user } = useContext(Context);

  return (
    <div className="container">
      <div className="todosContainer">
        <div className="todo" style={{ flexDirection: "column" }}>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
