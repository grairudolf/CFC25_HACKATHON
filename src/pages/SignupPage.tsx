import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Adjust the path as needed
import { useState, FormEvent } from "react"; // Import useState and FormEvent
import { Home } from "lucide-react"; // Import Home icon
// import { Chrome } from "lucide-react"; // Example if using a specific icon like Chrome for Google

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    auth.signup({ name, email }); // Simulate signup with name and email
    alert("Signed up (simulated) and logged in!");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-gray-900 p-4 selection:bg-primary/20">
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center text-sm text-foreground/80 hover:text-primary transition-colors duration-150">
          <Home className="w-4 h-4 mr-1.5" />
          Return to Home
        </Link>
      </div>

      <div className="flex flex-col items-center mb-8 animate-fade-in-slow">
        <img src="/logo_transparent.png" alt="SiliconHub Logo" className="h-16 w-auto mb-3" />
      </div>

      <Card className="w-full max-w-md shadow-xl animate-fade-in-up delay-100 rounded-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-primary">Create Your Account</CardTitle>
          <CardDescription className="text-foreground/70">
            Join SiliconHub and connect with Cameroon's digital ecosystem.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-5 p-6"> {/* Slightly adjusted gap */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="e.g., Ada Lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 text-base focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-base focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 text-base focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Create Account
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full h-11 text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              Sign up with Google
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col space-y-2 items-center p-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
