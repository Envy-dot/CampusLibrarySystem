import { Library } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-lg font-bold text-primary",
        className
      )}
    >
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <Library className="h-5 w-5" />
      </div>
      <span className="font-headline text-xl">CampusLink Library</span>
    </div>
  );
}
