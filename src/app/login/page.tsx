import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <AuthCard
      title="Student Login"
      description="Enter your credentials to access your account."
    >
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          <LogIn className="mr-2 h-4 w-4" /> Login
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
