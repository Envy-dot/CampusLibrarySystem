'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const bookFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  author: z.string().min(2, "Author must be at least 2 characters."),
  description: z.string().optional(),
  isbn: z.string().min(10, "ISBN must be at least 10 characters.").max(13, "ISBN can be at most 13 characters."),
  publicationYear: z.coerce.number().int().min(1800, "Invalid publication year.").max(new Date().getFullYear(), "Year cannot be in the future."),
  genre: z.string().min(2, "Genre is required."),
  copies: z.coerce.number().int().min(1, "There must be at least 1 copy."),
  imageUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

export default function AddBookPage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<BookFormValues>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: {
            title: "",
            author: "",
            description: "",
            isbn: "",
            publicationYear: undefined,
            genre: "",
            copies: 1,
            imageUrl: "",
        },
    });

    async function onSubmit(data: BookFormValues) {
       try {
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to add book.");
        }

        toast({
            title: "Success!",
            description: `The book "${data.title}" has been added to the catalog.`,
            variant: "default",
        });

        router.push('/librarian/inventory');
        router.refresh();

       } catch (error: any) {
           toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
           });
       }
    }

  return (
    <div className="space-y-8">
        <div className="flex justify-start">
             <Button variant="outline" asChild>
                <Link href="/librarian/inventory"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Inventory</Link>
            </Button>
        </div>

      <PageHeader title="Add New Book" description="Fill in the details to add a new book to the catalog." />

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 md:grid-cols-3">
                <div className="grid gap-8 md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Book Details</CardTitle>
                            <CardDescription>Provide the main information about the book.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. The Great Gatsby" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. F. Scott Fitzgerald" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="A brief summary of the book..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                             <FormField
                                control={form.control}
                                name="isbn"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="978-3-16-148410-0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="publicationYear"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Publication Year</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1925" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Genre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Fiction, Novel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-8 md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stock</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                           <FormField
                                control={form.control}
                                name="copies"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Total Copies</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Book Cover</CardTitle>
                            <CardDescription>Enter an image URL or leave blank for a placeholder.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                        <Save className="mr-2 h-4 w-4"/>
                        {form.formState.isSubmitting ? "Saving..." : "Save Book"}
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  );
}
