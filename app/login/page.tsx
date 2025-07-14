"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { users, owners, User, Owner } from "@/lib/mockData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Building2, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/authContext"

const userTypes = [
  { label: "User", value: "User" },
  { label: "Purifier Owner", value: "Business" },
]

export default function LoginPage() {
  const [userType, setUserType] = useState<"User" | "Business">("User")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login: authLogin } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    let found: User | Owner | undefined
    if (userType === "User") {
      found = users.find((u) => u.username === username && u.password === password)
      if (found) {
        authLogin(found, "User")
        setTimeout(() => {
          router.push("/user/dashboard")
        }, 800)
      } else {
        setError("Invalid User credentials. Try user_big/userbig123, user_anna/useranna123, user_john/userjohn123")
        setIsLoading(false)
      }
    } else {
      found = owners.find((o) => o.username === username && o.password === password)
      if (found) {
        authLogin(found, "Business")
        setTimeout(() => {
          router.push("/business/dashboard")
        }, 800)
      } else {
        setError("Invalid Owner credentials. Try owner_mega/ownmega123, owner_sam/ownersam123, owner_nina/ownnina123")
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-gradient-to-br from-blue-100/20 to-purple-100/20"></div>
      </div>
      <Card className="w-full max-w-md border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl relative">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Droplets className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            Purity Grid Login
          </CardTitle>
          <CardDescription className="text-blue-600">Sign in to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType" className="text-blue-900">Login as</Label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value as "User" | "Business")}
                className="w-full border-blue-200 focus:border-blue-500 rounded-md p-2"
              >
                {userTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-blue-900">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder={userType === "User" ? "user_big" : "owner_mega"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={userType === "User" ? "userbig123" : "ownmega123"}
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
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600">
              Demo Users: user_big/userbig123, user_anna/useranna123, user_john/userjohn123<br />
              Demo Owners: owner_mega/ownmega123, owner_sam/ownersam123, owner_nina/ownnina123
            </p>
          </div>

          <div className="mt-4 text-center">
            <a href="/" className="text-sm text-blue-600 hover:underline">
              ← Back to Home
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 