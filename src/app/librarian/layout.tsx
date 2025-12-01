import { DashboardHeader } from "@/components/dashboard-header";
import { LibrarianSidebarNav } from "@/components/librarian/sidebar-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LibrarianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <LibrarianSidebarNav />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader userRole="librarian" />
        <main className="flex-1 p-6 bg-muted/40">{children}</main>
      </div>
    </SidebarProvider>
  );
}
