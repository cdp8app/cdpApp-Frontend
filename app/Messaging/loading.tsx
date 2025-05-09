import { Loader2 } from "lucide-react"

export default function MessagingLoading() {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-center text-muted-foreground">Loading messages...</p>
      </div>
    </div>
  )
}
