import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { api } from "../lib/axios";
import axios from "axios"; // Import axios

interface AuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function exchangeGoogleCode(code: string): Promise<string | null> {
  console.log("exchangeGoogleCode called with code:", code);
  try {
    const response = await api.post("/auth/google/callback", { code });
    console.log("Exchange response:", response.data);
    return response.data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Code exchange error:",
        error.response ? error.response.data : error.message
      );
    } else {
      console.error("Code exchange error:", error);
    }
    return null;
  }
}

async function isTokenValid(): Promise<boolean> {
  console.log("isTokenValid called");
  try {
    await api.get("/auth/validate");
    return true;
  } catch {
    return false;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateStoredToken = async () => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken && (await isTokenValid())) {
      setIsAuthenticated(true);
      return true;
    } else {
      localStorage.removeItem("auth_token");
      setIsAuthenticated(false);
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
        console.error("Missing JWT");
        logout();
        return false;
      }

      localStorage.setItem("auth_token", jwt);

      if (!(await validateStoredToken())) {
        console.error("Invalid JWT");
        return false;
      }

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login error:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Login error:", error);
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
