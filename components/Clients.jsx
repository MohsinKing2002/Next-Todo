"use client";

import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useState, createContext, useContext, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const loadUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      return toast.error(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);

  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();

      if (!data.success) toast.error(data.message);
      setUser({});
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return user?._id ? (
    <button className="btn" onClick={logoutHandler}>
      Log out
    </button>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};

export const TodoBtn = ({ id, completed }) => {
  const router = useRouter();
  const deleteHandler = async () => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      router.refresh();
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };

  const updateHandler = async () => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      router.refresh();
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };
  return (
    <>
      <input type="checkbox" onChange={updateHandler} checked={completed} />
      <button className="btn" onClick={deleteHandler}>
        Delete
      </button>
    </>
  );
};
