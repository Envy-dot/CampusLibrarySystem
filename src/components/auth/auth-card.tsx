import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
};

export function AuthCard({ title, description, children, className }: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-6">
        <Logo />
      </div>
      <Card className={cn("w-full max-w-sm", className)}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
