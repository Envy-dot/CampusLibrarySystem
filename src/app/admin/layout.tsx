import { AdminSidebarNav } from "@/components/admin/sidebar-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebarNav />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader userRole="admin" />
        <main className="flex-1 p-6 bg-muted/40">{children}</main>
      </div>
    </SidebarProvider>
  );
}
