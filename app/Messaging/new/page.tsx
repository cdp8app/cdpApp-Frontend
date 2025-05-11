"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Textarea } from "@/app/Components/ui/textarea";
import { Input } from "@/app/Components/ui/input";
import { AlertCircle, Send, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/app/Components/ui/alert";
import AuthRedirect from "@/app/Components/AuthRedirect";
import Navbar1 from "@/app/Components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

export default function NewMessagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Get recipient from URL query parameter
  useEffect(() => {
    const recipientParam = searchParams?.get("recipient");
    if (recipientParam) {
      setRecipient(recipientParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient.trim()) {
      setError("Recipient email is required");
      return;
    }
    
    if (!subject.trim()) {
      setError("Subject is required");
      return;
    }
    
    if (!message.trim()) {
      setError("Message is required");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      // In a real implementation, you would send the message to your API
      // For now, we'll simulate a successful send
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/messaging");
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthRedirect />
      <Navbar1 userType={user?.userType === "company" ? "company" : "student"} />
      
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/messaging")}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Messages
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>New Message</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="bg-green-50 text-green-700 border-green-200">
                  <AlertDescription>Message sent successfully! Redirecting...</AlertDescription>
                </Alert>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">To:</label>
                <Input 
                  type="email" 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Recipient email address"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subject:</label>
                <Input 
                  type="text" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Message subject"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message:</label>
                <Textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={8}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isLoading || success}
                className="flex items-center"
              >
                {isLoading ? "Sending..." : "Send Message"}
                {!isLoading && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}