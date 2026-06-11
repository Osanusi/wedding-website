import { useState, useEffect, useCallback, startTransition } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ThemeMusicController from "../components/ThemeMusicController";
import TimelessBackdrop from "../components/TimelessBackdrop";

export default function MainLayout() {
  const [isDark, setIsDarkState] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const setIsDark = useCallback((value: boolean) => {
    startTransition(() => {
      setIsDarkState(value);
    });
  }, []);

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
    <div className="relative isolate min-h-screen overflow-hidden bg-beige text-warm-gray dark:bg-tron-black dark:text-gray-300 transition-colors duration-500">
      {!isDark && <TimelessBackdrop variant="page" />}
      <div className="relative z-10">
        <Navbar isDark={isDark} />
        <main>
          <Outlet context={{ isDark, setIsDark }} />
        </main>
        <ThemeMusicController isDark={isDark} setIsDark={setIsDark} />
      </div>
    </div>
  );
}
