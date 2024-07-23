"use client";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  let savedUser;

  if (typeof window !== "undefined") {
    const user = localStorage?.getItem("user");
    if (user) savedUser = JSON?.parse(user);
  }

  useEffect(() => {
    if (savedUser) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-grow items-center justify-center min-h-screen py-2 bg-gray-50">
        <header className="absolute top-0 w-full py-6 bg-blue-600">
          <h1 className="text-3xl font-bold text-center text-white">
            Contact Manager
          </h1>
        </header>
        <hr className="mb-20" />
        {loading ? (
          <div>Loading...</div>
        ) : !isLoggedIn ? (
          <Welcome setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Dashboard
            accessToken={savedUser?.accessToken}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}

        <Toaster />
      </main>
      <footer className="w-full py-6 bg-blue-600">
        <p className="text-sm text-center text-white">
          &copy; 2024 Contact Manager. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
