import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Compass, ArrowRight } from "lucide-react";
import loginImage from "@/assets/login-travel.jpg";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { getAuthErrorMessage } from "@/lib/error-utils";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;

      toast({ title: "Welcome back!", description: "Successfully signed in" });
      onOpenChange(false);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: getAuthErrorMessage(error),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden rounded-3xl border-border">
        <div className="flex">
          {/* Left side - Image */}
          <div className="hidden md:block w-1/2 relative">
            <img
              src={loginImage}
              alt="Beautiful mountain landscape"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-primary-foreground text-lg font-display font-medium drop-shadow-lg">
                "The world is a book, and those who do not travel read only one page."
              </p>
              <p className="text-primary-foreground/80 text-sm mt-2 drop-shadow-md">
                — Saint Augustine
              </p>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="flex-1 p-8 md:p-10 bg-card">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-soft">
                  <Compass className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-display font-semibold text-primary">Wanderly</span>
              </div>
              <DialogTitle className="text-2xl font-display font-semibold text-foreground">
                Welcome back
              </DialogTitle>
              <p className="text-muted-foreground text-sm mt-1">
                Sign in to continue your travel planning
              </p>
            </DialogHeader>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-pulse-soft">Signing in...</span>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    onOpenChange(false);
                    navigate("/dashboard");
                  }}
                  className="text-primary font-medium hover:underline"
                >
                  Start planning for free
                </button>
              </p>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
