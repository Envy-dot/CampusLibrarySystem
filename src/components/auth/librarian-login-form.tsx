"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export function LibrarianLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("charlie@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.ok) {
        const data = await response.json();
        if (data.role === 'librarian') {
            router.push('/librarian');
        } else {
            setError('You do not have permission to access this dashboard.');
        }
    } else {
      const data = await response.json();
      setError(data.error || 'An unexpected error occurred.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
         <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        <LogIn className="mr-2 h-4 w-4" /> 
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
