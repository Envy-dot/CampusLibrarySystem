import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { ArrowRight, BookUser, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'landing-hero');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <Button asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </header>
      <main className="flex-grow">
        <section className="relative py-20 md:py-32 bg-primary/5">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6">
              Welcome to CampusLink Library
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Your digital gateway to a world of knowledge. Borrow, reserve, and manage your library account with ease.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/app/books">
                  Explore Books <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold">Access For Every Role</h2>
              <p className="text-muted-foreground mt-2">Tailored experiences for students, librarians, and administrators.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <User className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">For Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Browse the catalog, reserve books, and track your borrowing history on the go.</p>
                  <Button variant="outline" asChild>
                    <Link href="/login">Student Login <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <BookUser className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">For Librarians</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Manage inventory, process check-outs, and handle fines with a powerful dashboard.</p>
                   <Button variant="outline" asChild>
                    <Link href="/librarian/login">Librarian Login <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">For Admins</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Oversee user management, generate system reports, and configure library settings.</p>
                   <Button variant="outline" asChild>
                    <Link href="/admin/login">Admin Login <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary/90 text-primary-foreground/80 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Logo className="justify-center text-primary-foreground" />
          <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} CampusLink Library. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
