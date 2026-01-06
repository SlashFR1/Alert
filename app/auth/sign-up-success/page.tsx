import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 bg-[#0A0A0F]">
      <div className="w-full max-w-sm">
        <Card className="border-white/10 bg-[#13131A]">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Check your email</CardTitle>
            <CardDescription className="text-white/60">We sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-white/70">
              You&apos;ve successfully signed up! Please check your email to confirm your account before signing in.
            </p>
            <Button asChild className="w-full">
              <Link href="/auth/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
