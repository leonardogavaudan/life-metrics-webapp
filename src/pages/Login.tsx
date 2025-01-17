import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../lib/axios";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect triggered");
    async function loginApp() {
      const code = searchParams.get("code");
      if (code) {
        console.log("Code received:", code);
        try {
          const success = await login(code);
          console.log("Login success:", success);
          if (success) {
            navigate("/dashboard");
          } else {
            setError("Authentication failed. Please try logging in again.");
          }
        } catch {
          setError("An error occurred during login. Please try again.");
        }
      }
    }

    loginApp();
  }, [searchParams, login, navigate]);

  const handleGoogleLogin = async () => {
    console.log("Google login initiated");
    try {
      const response = await api.get("/auth/google");
      const { url } = response.data;
      console.log("Redirect URL:", url);
      window.location.href = url;
    } catch (error) {
      console.error("Error initiating Google login:", error);
      setError("Failed to initiate Google login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <Card className="w-full max-w-5xl grid md:grid-cols-2 overflow-hidden shadow-xl">
        {/* Image Section */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-[2px] z-10" />
          <img
            src="https://www.universetoday.com/wp-content/uploads/2020/02/Cylinder_Interior_AC75-1086_5732-2000x1200.jpg"
            alt="Login background"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <h2 className="text-white text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Welcome to Life Metrics
            </h2>
            <p className="text-white/90 mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] font-semibold">
              Your data-driven path to optimal health
            </p>
          </div>
        </div>

        {/* Login Section */}
        <div className="p-8 flex flex-col justify-center space-y-6">
          <div className="space-y-2 text-center">
            <CardDescription className="text-lg">
              Sign in or create an account to continue
            </CardDescription>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-12 px-6 flex items-center justify-center space-x-2 hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={handleGoogleLogin}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="#" className="underline hover:text-primary">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
