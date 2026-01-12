import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";

interface SignupPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
}

const SignupPromptDialog = ({ open, onOpenChange, feature = "this feature" }: SignupPromptDialogProps) => {
  const navigate = useNavigate();

  const handleSignup = () => {
    onOpenChange(false);
    navigate("/login?mode=signup");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-display">Save your trip to see more</DialogTitle>
          <DialogDescription className="text-base">
            Create a free account to unlock {feature} and save your personalized itineraries.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Access full multi-day itineraries</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Save and edit your trips anytime</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Get personalized recommendations</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6">
          <Button variant="hero" size="lg" onClick={handleSignup}>
            Create Free Account
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupPromptDialog;
