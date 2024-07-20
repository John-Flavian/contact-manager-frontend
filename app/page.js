"use client";
import Image from "next/image";
import RegisterAndLogin from "./components/RegisterAndLogin";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <header className="absolute top-0 w-full py-6 bg-blue-600">
        <h1 className="text-3xl font-bold text-center text-white">
          Contact Manager
        </h1>
      </header>
      <hr className="mb-20" />
      {!isLoggedIn ? <Welcome setIsLoggedIn={setIsLoggedIn} /> : <Dashboard />}

      <footer className="relative bottom-0 w-full py-6 bg-blue-600">
        <p className="text-sm text-center text-white">
          &copy; 2024 Contact Manager. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
