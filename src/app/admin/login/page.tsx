import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { LogIn } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <AuthCard
      title="Admin Login"
      description="Access the admin dashboard."
    >
      <form className="space-y-4" action="/admin">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="diana@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" defaultValue="password" required />
        </div>
        <Button type="submit" className="w-full">
          <LogIn className="mr-2 h-4 w-4" /> Login
        </Button>
      </form>
    </AuthCard>
  );
}
