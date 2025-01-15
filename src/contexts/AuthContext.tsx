import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { api } from "../lib/axios";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function exchangeGoogleCode(code: string): Promise<string | null> {
  try {
    const response = await api.post("/auth/google/callback", { code });
    return response.data.token;
  } catch (error) {
    console.error("Code exchange error:", error);
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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const validateStoredToken = async () => {
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken && (await isTokenValid())) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("auth_token");
        setToken(null);
        setIsAuthenticated(false);
      }
    };

    validateStoredToken();
  }, []);

  const login = async (googleCode: string): Promise<boolean> => {
    try {
      const jwt = await exchangeGoogleCode(googleCode);
      if (!jwt || !(await isTokenValid())) {
        console.error("Invalid or missing JWT");
        logout();
        return false;
      }

      localStorage.setItem("auth_token", jwt);
      setToken(jwt);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      logout();
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
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
