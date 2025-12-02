"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "lucide-react";
import { Logo } from "./logo";
import { LogoutButton } from "@/components/auth/logout-button";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/session";
import { Skeleton } from "./ui/skeleton";


type DashboardHeaderProps = {
    userRole: 'admin' | 'librarian';
}

type UserProfile = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    imageHint: string;
}

export function DashboardHeader({userRole}: DashboardHeaderProps) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const session = await getSession();
            if (!session?.userId) {
                setLoading(false);
                return;
            }
            // In a real app, you would fetch user data based on the session
            const response = await fetch(`/api/users/${session.userId}/profile`);
            if (response.ok) {
                const profileData = await response.json();
                setUser(profileData);
            }
            setLoading(false);
        };
        fetchUser();
    }, [userRole]);

    if (loading) {
      return (
         <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex w-full items-center justify-end">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
         </header>
      )
    }

    if (!user) return (
       <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="md:hidden">
           <Logo />
         </div>
         <SidebarTrigger className="md:hidden" />
      </header>
    );

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
       <div className="md:hidden">
         <Logo />
       </div>
       <SidebarTrigger className="md:hidden" />
      <div className="flex w-full items-center justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.imageHint} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
             <LogoutButton variant="ghost" className="w-full justify-start font-normal px-2">Log out</LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
