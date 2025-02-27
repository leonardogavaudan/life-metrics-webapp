import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { data: user } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-slate-800 shadow py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-white">LIFE METRICS</span>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/integrations"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Integrations
              </Link>
              <Link
                to="/preferences"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Preferences
              </Link>
              <Link
                to="/settings"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Settings
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={user?.pictureUrl ?? undefined}
                alt={user?.name}
              />
              <AvatarFallback>
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : user?.email?.[0].toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>

            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
