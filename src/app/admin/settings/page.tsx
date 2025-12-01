import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

export default function SystemSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader title="System Settings" description="Configure general settings for the library system." />

      <Card>
        <CardHeader>
            <CardTitle>Borrowing Policies</CardTitle>
            <CardDescription>Set the rules for borrowing books.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="loan-period">Standard Loan Period (Days)</Label>
                    <Input id="loan-period" type="number" defaultValue="21" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="max-books">Max Books per User</Label>
                    <Input id="max-books" type="number" defaultValue="5" />
                </div>
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Enable Auto-Renewals</Label>
                    <p className="text-sm text-muted-foreground">
                    Automatically renew books if they are not reserved by another user.
                    </p>
                </div>
                <Switch defaultChecked />
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Fine Policies</CardTitle>
            <CardDescription>Define the penalties for overdue books.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
             <div className="space-y-2">
                <Label htmlFor="fine-rate">Fine Rate (per day)</Label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">$</span>
                    <Input id="fine-rate" type="number" defaultValue="0.25" className="pl-7"/>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="max-fine">Maximum Fine per Book</Label>
                 <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">$</span>
                    <Input id="max-fine" type="number" defaultValue="10.00" className="pl-7"/>
                </div>
            </div>
        </CardContent>
      </Card>

       <div className="flex justify-end">
            <Button size="lg">
                <Save className="mr-2 h-4 w-4" /> Save All Settings
            </Button>
        </div>
    </div>
  );
}
