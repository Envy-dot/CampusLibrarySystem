"use client";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getClientSession } from "@/lib/session";
import { ArrowRight, Bell, History, ShieldCheck, User } from "lucide-react";
import Link from 'next/link';
import { LogoutButton } from "@/components/logout-button";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type UserProfile = {
    id: string;
    name: string;
    email: string;
    memberSince: string;
    avatarUrl: string;
    imageHint: string;
    borrowedCount: number;
    reservedCount: number;
}


export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    
    useEffect(() => {
      const fetchProfile = async () => {
        const session = await getClientSession();
        if (!session?.userId) {
          redirect('/login');
        }

        const response = await fetch(`/api/users/${session.userId}/profile`, { cache: 'no-store' });
        if (response.ok) {
          setUser(await response.json());
        }
      }
      fetchProfile();
    }, []);
    
    if (!user) {
         return (
            <div className="space-y-6">
                 <PageHeader title="My Profile" />
                 <p className="text-muted-foreground text-center">Loading profile...</p>
            </div>
         )
    }

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" />

      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24 border-4 border-primary/50">
          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.imageHint} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
            <h2 className="text-2xl font-bold font-headline">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 grid grid-cols-2 gap-4 text-center">
            <div>
                <p className="text-2xl font-bold">{user.borrowedCount}</p>
                <p className="text-sm text-muted-foreground">Borrowed</p>
            </div>
             <div>
                <p className="text-2xl font-bold">{user.reservedCount}</p>
                <p className="text-sm text-muted-foreground">Reserved</p>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-2">
            <nav className="flex flex-col">
                <Link href="/app/profile" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
                    <div className="flex items-center gap-3"><User className="h-5 w-5 text-muted-foreground"/><span>Account Information</span></div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                </Link>
                <Separator/>
                <Link href="/app/my-borrowed-books" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
                    <div className="flex items-center gap-3"><History className="h-5 w-5 text-muted-foreground"/><span>Borrowing History</span></div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                </Link>
                <Separator/>
                <Link href="#" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
                    <div className="flex items-center gap-3"><Bell className="h-5 w-5 text-muted-foreground"/><span>Notification Settings</span></div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                </Link>
                 <Separator/>
                <Link href="#" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
                    <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-muted-foreground"/><span>Privacy & Security</span></div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                </Link>
            </nav>
        </CardContent>
      </Card>
      
       <LogoutButton variant="outline" className="w-full">
            Logout
        </LogoutButton>

    </div>
  );
}
