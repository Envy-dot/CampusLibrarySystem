import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";

// Re-using the UserProfile type from the student profile page
type UserProfile = {
    id: string;
    name: string;
    email: string;
    memberSince: string;
    avatarUrl: string;
    imageHint: string;
}

async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}/profile`, { cache: 'no-store' });
    if (!response.ok) {
        return null;
    }
    return response.json();
}

export default async function LibrarianProfilePage() {
    const session = await getServerSession();
    if (!session?.userId) {
        redirect('/librarian/login');
    }

    const user = await getUserProfile(session.userId as string);
    if (!user) {
        return <p>Could not load profile.</p>
    }

  return (
    <div className="space-y-8">
      <PageHeader title="My Profile" description="View and edit your personal information." />
      <Card>
          <CardHeader>
              <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.imageHint} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                   <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                  </div>
                   <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                  </div>
              </div>
              <Button>Save Changes</Button>
          </CardContent>
      </Card>
    </div>
  );
}
