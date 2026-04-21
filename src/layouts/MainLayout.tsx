import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ThemeMusicController from "../components/ThemeMusicController";

export default function MainLayout() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-beige text-warm-gray dark:bg-tron-black dark:text-gray-300 transition-colors duration-500">
      <Navbar isDark={isDark} />
      <main>
        <Outlet context={{ isDark, setIsDark }} />
      </main>
      <ThemeMusicController isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
}
