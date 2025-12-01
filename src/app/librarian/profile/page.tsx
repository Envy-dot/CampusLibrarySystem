import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { users } from "@/lib/data";

export default function LibrarianProfilePage() {
    const user = users.find(u => u.role === 'librarian');
    if (!user) return null;

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
