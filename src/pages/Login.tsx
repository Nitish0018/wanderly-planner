import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Compass, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { getAuthErrorMessage } from "@/lib/error-utils";

const Login = () => {
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
    <div className="min-h-screen gradient-warm flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24">
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center shadow-card">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-semibold text-primary">Wanderly</span>
            </div>

            <h1 className="text-5xl xl:text-6xl font-display font-semibold text-foreground leading-tight mb-6">
              Your journey,<br />
              <span className="text-primary">perfectly planned.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Let our AI craft personalized travel itineraries that fit your budget and dreams.
              No more endless research—just pure adventure.
            </p>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 right-20 w-20 h-20 rounded-full bg-accent/10 animate-float" />
          <div className="absolute bottom-40 right-40 w-32 h-32 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-soft">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-semibold text-primary">Wanderly</span>
          </div>

          <div className="bg-card rounded-3xl shadow-card p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                Welcome back
              </h2>
              <p className="text-muted-foreground">
                Sign in to continue your travel planning
              </p>
            </div>

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

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-primary font-medium hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
