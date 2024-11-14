"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types";

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Simulated API call - replace with your actual auth logic
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              email: credentials.email,
              role: credentials.email.includes("company")
                ? "client"
                : ("contractor" as UserRole),
            },
          });
        }, 1000);
      });

      console.log("response", response);

      // Set cookies or tokens here
      document.cookie = `auth-token=dummy-token; path=/`;
      document.cookie = `user-role=${response.user.role}; path=/`;

      // Redirect based on role
      router.push(response.user.role === "client" ? "/company" : "/contractor");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
