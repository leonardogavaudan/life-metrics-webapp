import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processOAuthCallback = async () => {
      const code = searchParams.get("code");

      if (!code) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No authorization code found",
        });
        navigate("/integrations");
        return;
      }

      try {
        await api.post("/oauth/callback", { code });
        toast({
          title: "Success",
          description: "Integration connected successfully",
        });
      } catch (error) {
        console.error("OAuth callback error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to connect integration",
        });
      } finally {
        setIsProcessing(false);
        navigate("/integrations");
      }
    };

    processOAuthCallback();
  }, [searchParams, navigate, toast]);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Connecting your integration
          </h2>
          <p className="text-muted-foreground">Please wait...</p>
        </div>
      </div>
    );
  }

  return null;
};
