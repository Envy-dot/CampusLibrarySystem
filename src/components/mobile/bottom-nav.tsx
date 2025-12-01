"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Book, Bookmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/app/books", label: "Catalog", icon: Book },
  { href: "/app/my-reservations", label: "My Books", icon: Bookmark },
  { href: "/app/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-around max-w-md mx-auto px-0">
        {navItems.map((item) => {
          const isActive = (pathname === item.href) || (item.href !== "/app" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-md text-sm font-medium",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
