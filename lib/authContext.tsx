import React, { createContext, useContext, useState, useEffect } from "react"
import type { User, Owner } from "@/lib/mockData"

interface AuthContextType {
  user: User | Owner | null
  userType: "User" | "Business" | null
  login: (user: User | Owner, userType: "User" | "Business") => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | Owner | null>(null)
  const [userType, setUserType] = useState<"User" | "Business" | null>(null)

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem("purity_auth")
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed.user)
      setUserType(parsed.userType)
    }
  }, [])

  const login = (user: User | Owner, userType: "User" | "Business") => {
    setUser(user)
    setUserType(userType)
    localStorage.setItem("purity_auth", JSON.stringify({ user, userType }))
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem("purity_auth")
  }

  return (
    <AuthContext.Provider value={{ user, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
} 