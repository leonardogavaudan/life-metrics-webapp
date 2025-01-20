import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { api } from "../lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const SettingsPage = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/account");
      setIsDeleteDialogOpen(false);
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        variant: "destructive",
        title: "Error deleting account",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        action: (
          <ToastAction altText="Try again" onClick={handleDeleteAccount}>
            Try again
          </ToastAction>
        ),
      });
      setError("Failed to delete account. Please try again.");
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
              onOpenChange={(open) => {
                if (!open) {
                  setError(null);
                }
                // Only allow closing if there's no error
                if (!error) {
                  setIsDeleteDialogOpen(open);
                }
              }}
            >
              <AlertDialogContent autoFocus={false}>
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
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};
