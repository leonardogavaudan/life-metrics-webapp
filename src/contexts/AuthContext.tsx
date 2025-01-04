import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function isTokenValid(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }

    const response = await fetch("https://your-backend-url/validate-token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.ok;
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
      if (storedToken && (await isTokenValid(storedToken))) {
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

  const login = async (newToken: string): Promise<boolean> => {
    if (await isTokenValid(newToken)) {
      localStorage.setItem("auth_token", newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      return true;
    } else {
      console.error("Invalid token provided");
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
