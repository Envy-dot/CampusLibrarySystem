import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { users } from "@/lib/data";
import { ArrowRight, Bell, BookCheck, History, LogOut, ShieldCheck, User } from "lucide-react";
import Link from 'next/link';

export default function ProfilePage() {
    const user = users.find(u => u.id === '1');
    if (!user) return null;

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
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Borrowed</p>
            </div>
             <div>
                <p className="text-2xl font-bold">1</p>
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
      
       <Button variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4"/>
            Logout
        </Button>

    </div>
  );
}
