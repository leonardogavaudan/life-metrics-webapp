import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
import { api } from "@/lib/axios";
import axios from "axios"; // Import axios
import { ReactNode, useEffect, useState } from "react";

async function exchangeGoogleCode(code: string): Promise<string | null> {
  try {
    const response = await api.post("/auth/google/callback", { code });
    return response.data.token;
  } catch (error) {
    if (import.meta.env.DEV) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Code exchange error:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Code exchange error:", error);
      }
    }
    return null;
  }
}

async function isTokenValid(): Promise<boolean> {
  try {
    await api.get("/auth/validate");
    return true;
  } catch {
    return false;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateStoredToken = async () => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken && (await isTokenValid())) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } else {
      localStorage.removeItem("auth_token");
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    validateStoredToken();
  }, []);

  const login = async (googleCode: string): Promise<boolean> => {
    try {
      const jwt = await exchangeGoogleCode(googleCode);
      if (!jwt) {
        if (import.meta.env.DEV) {
          console.error("Missing JWT");
        }
        logout();
        return false;
      }

      localStorage.setItem("auth_token", jwt);

      if (!(await validateStoredToken())) {
        if (import.meta.env.DEV) {
          console.error("Invalid JWT");
        }
        return false;
      }

      return true;
    } catch (error) {
      if (import.meta.env.DEV) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Login error:",
            error.response ? error.response.data : error.message
          );
        } else {
          console.error("Login error:", error);
        }
      }
      logout();
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
