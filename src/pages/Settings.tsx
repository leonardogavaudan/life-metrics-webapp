import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/useUser";

const SettingsPage: React.FC = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useUser();

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/users/me");
      setIsDeleteDialogOpen(false);

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently removed",
      });

      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch {
      setError(
        "Failed to delete account. Contact support if the issue persists."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="space-y-6 max-w-2xl">
          <div className="bg-slate-700 p-6 rounded-lg animate-pulse">
            <div className="h-4 bg-slate-600 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-slate-600 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
          Failed to load user data. Please try refreshing the page.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-slate-700 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <div className="mt-1.5">
                <div className="text-sm text-muted-foreground bg-slate-800/50 rounded-md px-3 py-2">
                  {user.name}
                </div>
              </div>
            </div>
            <div>
              <Label>Connected Google Account</Label>
              <div className="mt-1.5">
                <div className="text-sm text-muted-foreground bg-slate-800/50 rounded-md px-3 py-2">
                  {user.email}
                </div>
              </div>
            </div>
            <div>
              <Label>Member Since</Label>
              <div className="mt-1.5">
                <div className="text-sm text-muted-foreground bg-slate-800/50 rounded-md px-3 py-2">
                  {user.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-700 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Data & Privacy</h2>
          <div className="space-y-4">
            <div className="flex justify-start">
              <Button
                variant="destructive"
                className="rounded-lg"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete Account
              </Button>
            </div>

            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {error ? (
                      <span className="text-red-500">{error}</span>
                    ) : (
                      "This action cannot be undone. This will permanently delete your account and all associated data."
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setError(null);
                      setIsDeleteDialogOpen(false);
                    }}
                  >
                    {error ? "Dismiss" : "Cancel"}
                  </Button>
                  {!error && (
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Delete Account
                    </Button>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
