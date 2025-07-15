"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Eye, EyeOff } from "lucide-react"
import { signInWithEmail } from '../../../lib/auth';

export default function BusinessLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("");
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const { error } = await signInWithEmail(email, password);
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }
    // Success: redirect
    setMessage('Login successful! Redirecting...');
    setTimeout(() => router.push("/business/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-blue-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-blue-900">Business Login</CardTitle>
          <CardDescription className="text-blue-600">Access your business analytics dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900">
                Business Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="business@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="demo123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-blue-200 focus:border-blue-500 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-blue-600" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            {message && <p className="text-center text-sm mt-2 text-blue-700">{message}</p>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600">
              {"Don't have a business account? "}
              <Link href="/business/signup" className="text-blue-700 hover:underline font-medium">
                Sign up
              </Link>
            </p>
            <p className="text-xs text-blue-500 mt-2">Demo: business@demo.com / demo123</p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
