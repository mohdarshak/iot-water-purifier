import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Building2, Users, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-900">PurityGrid</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-blue-700 hover:text-blue-900">
                Features
              </a>
              <a href="#about" className="text-blue-700 hover:text-blue-900">
                About
              </a>
              <a href="#contact" className="text-blue-700 hover:text-blue-900">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Smart Water Purification
            </h2>
            <p className="text-xl text-blue-800/80 mb-12 max-w-3xl mx-auto font-medium">
              Monitor your water quality in real-time with our intelligent IoT water purifiers. Perfect for homes and
              businesses seeking pure, safe water.
            </p>

            {/* Login Options */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-white/20 bg-white/70 backdrop-blur-lg hover:shadow-2xl hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">User Portal</CardTitle>
                  <CardDescription className="text-blue-600">
                    Monitor your home water purifier and track water quality metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Link href="/user/login">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">User Login</Button>
                    </Link>
                    <Link href="/user/signup">
                      <Button
                        variant="outline"
                        className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        User Sign Up
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/20 bg-white/70 backdrop-blur-lg hover:shadow-2xl hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Business Portal</CardTitle>
                  <CardDescription className="text-blue-600">
                    Manage multiple devices and analyze business water usage data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Link href="/business/login">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Business Login</Button>
                    </Link>
                    <Link href="/business/signup">
                      <Button
                        variant="outline"
                        className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        Business Sign Up
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Why Choose PurityGrid?</h3>
            <p className="text-blue-700 max-w-2xl mx-auto">
              Advanced monitoring and analytics for optimal water quality management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Real-time Analytics</h4>
              <p className="text-blue-700/80">Monitor pH, TDS, temperature, and flow rates in real-time</p>
            </div>

            <div className="text-center group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Droplets className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Filter Health Monitoring</h4>
              <p className="text-blue-700/80">Track filter performance and get replacement alerts</p>
            </div>

            <div className="text-center group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Multi-Device Management</h4>
              <p className="text-blue-700/80">Manage multiple purifiers from a single dashboard</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
