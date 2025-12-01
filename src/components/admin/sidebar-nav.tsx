"use client";

import {
  Book,
  Gauge,
  LogOut,
  Settings,
  BarChart,
  Users,
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

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: Gauge },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/books", label: "Book Management", icon: Book },
  { href: "/admin/reports", label: "Reports", icon: BarChart },
  { href: "/admin/settings", label: "System Settings", icon: Settings },
];

export function AdminSidebarNav() {
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
                  isActive={pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))}
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
            <SidebarMenuButton icon={<LogOut />}>Logout</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
