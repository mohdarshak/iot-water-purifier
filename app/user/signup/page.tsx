"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Eye, EyeOff } from "lucide-react"
import { signUpWithEmail } from '../../../lib/auth';
import { supabase } from '../../../lib/supabaseClient';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "renter", // default role
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    // Supabase signup
    const { data, error } = await signUpWithEmail(formData.email, formData.password);
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    // Insert into 'users' table with role
    if (data.user) {
      const { error: userError } = await supabase.from('users').insert([
        {
          id: data.user.id,
          name: formData.name,
          role: formData.role,
        },
      ]);
      if (userError) {
        setMessage('Signup succeeded, but failed to save user info: ' + userError.message);
        setIsLoading(false);
        return;
      }
    }

    setMessage('Account created successfully! Please check your email to confirm your account.');
    setIsLoading(false);
    setTimeout(() => router.push('/user/login'), 2000);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Create Account
          </CardTitle>
          <CardDescription className="text-blue-600">Start monitoring your water quality today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-900">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-blue-900">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-blue-900">
                Role
              </Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="border-blue-200 focus:border-blue-500 w-full rounded-md p-2"
                required
              >
                <option value="owner">Owner</option>
                <option value="renter">Renter</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-900">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            {message && <p className="text-center text-sm mt-2 text-blue-700">{message}</p>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600">
              Already have an account?{" "}
              <Link href="/user/login" className="text-blue-700 hover:underline font-medium">
                Sign in
              </Link>
            </p>
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
