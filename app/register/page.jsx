"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Context } from "../../components/Clients";
import { redirect } from "next/navigation";

const Page = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(Context);

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  if (user?._id) return redirect("/");
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={registerHandler}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Your Password"
            />

            <button type="submit">Register</button>
            <p>OR</p>
            <Link href={"/login"}>Login</Link>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Page;
