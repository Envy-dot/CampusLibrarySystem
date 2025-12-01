import { BottomNav } from "@/components/mobile/bottom-nav";
import { MobileHeader } from "@/components/mobile/mobile-header";

export default function MobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/40">
      <div className="relative flex min-h-screen flex-col bg-background max-w-md mx-auto border-x">
        <MobileHeader />
        <main className="flex-1 p-4 sm:p-6 pb-24">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
