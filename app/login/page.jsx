"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { Context } from "../../components/Clients";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);

      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      return toast.error(data.message);
    }
  };

  if (user?._id) return redirect("/");

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={loginHandler}>
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

            <button type="submit">Login</button>
            <p>OR</p>
            <Link href={"/register"}>New User</Link>
          </form>
        </section>
      </div>
    </div>
  );
};

export const metadata = {
  title: "Login",
  description: "Login Page of todo app",
};
export default Page;
