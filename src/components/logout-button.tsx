"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function LogoutButton({ children, className, ...props }: { children: React.ReactNode, className?: string } & ButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} className={className} {...props}>
      <LogOut className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
}
