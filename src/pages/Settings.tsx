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

const SettingsPage: React.FC = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/account");
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
        "Failed to delete account. Please ensure you have no active subscriptions and try again. Contact support if the issue persists."
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-slate-700 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="google-account">Connected Google Account</Label>
              <div className="mt-1.5">
                <div className="text-sm text-muted-foreground bg-slate-800/50 rounded-md px-3 py-2">
                  user@gmail.com
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
