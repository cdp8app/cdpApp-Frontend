import Link from "next/link";
import { Button } from "@/app/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/Components/ui/card";
import { MessageSquare } from "lucide-react";

export default function MessagingNotFound() {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Messaging Not Available</CardTitle>
          <CardDescription>The messaging feature could not be found</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">
            The messaging feature you&apos;re looking for is not available or is still under development.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
