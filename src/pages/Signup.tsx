import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { getAuthErrorMessage } from "@/lib/error-utils";

const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateGmail = (emailValue: string): boolean => {
    const trimmed = emailValue.trim().toLowerCase();
    if (!trimmed) {
      setEmailError("Email is required");
      return false;
    }
    if (!trimmed.endsWith("@gmail.com")) {
      setEmailError("Only Gmail addresses (@gmail.com) are allowed");
      return false;
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    if (!emailRegex.test(trimmed)) {
      setEmailError("Please enter a valid Gmail address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!fullName.trim()) {
      toast({
        title: "Error",
        description: "Full name is required",
        variant: "destructive",
      });
      return;
    }

    if (!validateGmail(email)) {
      return;
    }

    if (!password || password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(email.trim().toLowerCase(), password, fullName.trim());
      if (error) throw error;
      
      toast({ 
        title: "Account created!", 
        description: "Welcome to Wanderly." 
      });
      navigate("/dashboard");
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError && value) {
      validateGmail(value);
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
              Start your<br />
              <span className="text-primary">adventure today.</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Join thousands of travelers who plan smarter trips with AI-powered itineraries.
            </p>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 right-20 w-20 h-20 rounded-full bg-accent/10 animate-float" />
          <div className="absolute bottom-40 right-40 w-32 h-32 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Right side - Signup form */}
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
                Create your account
              </h2>
              <p className="text-muted-foreground">
                Sign up with your Gmail to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Gmail only)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => email && validateGmail(email)}
                  className={`h-11 ${emailError ? 'border-destructive' : ''}`}
                  required
                />
                {emailError && (
                  <p className="text-sm text-destructive">{emailError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button 
                  onClick={() => navigate("/login")}
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By creating an account, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;