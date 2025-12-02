"use client";

import {
  Book,
  BookUser,
  Gauge,
  Receipt,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "../logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

const menuItems = [
  { href: "/librarian", label: "Dashboard", icon: Gauge },
  { href: "/librarian/inventory", label: "Book Inventory", icon: Book },
  { href: "/librarian/borrow-return", label: "Borrow / Return", icon: BookUser },
  { href: "/librarian/fines", label: "Fine Tracking", icon: Receipt },
  { href: "/librarian/profile", label: "Profile", icon: User },
];

export function LibrarianSidebarNav() {
  const pathname = usePathname();
  
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== "/librarian" && pathname.startsWith(item.href))}
                  icon={<item.icon />}
                >
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutButton variant="ghost" className="w-full justify-start">Logout</LogoutButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
