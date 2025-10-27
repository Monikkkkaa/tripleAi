"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MultiAIDashboard from "@/components/MultiAIDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("authToken");

      if (loggedIn) {
        // User not logged in, redirect to login page
        setIsAuthenticated(true);
      } else {
        // User is authenticated
        router.replace("/login");
      }
      setIsLoading(false);
    };

    checkAuth();

    // Optional: Listen for storage changes (if user logs out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "loggedIn" && e.newValue !== "true") {
        router.replace("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render dashboard if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <MultiAIDashboard />;
}