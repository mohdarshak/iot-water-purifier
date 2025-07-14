import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Users, Target, Award, Globe, Shield, Zap, ArrowLeft, CheckCircle } from 'lucide-react'

export default function AboutPage() {
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
              <Link href="/" className="text-blue-700 hover:text-blue-900">
                Home
              </Link>
              <Link href="/about" className="text-blue-700 hover:text-blue-900 font-semibold">
                About
              </Link>
              <Link href="/contact" className="text-blue-700 hover:text-blue-900">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              About PurityGrid
            </h2>
            <p className="text-xl text-blue-800/80 max-w-3xl mx-auto">
              Pioneering the future of water purification through innovative IoT technology and sustainable solutions.
            </p>
          </div>

          {/* Company Story */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Story
              </h3>
              <p className="text-blue-700 leading-relaxed">
                Founded in 2020, PurityGrid emerged from a simple yet powerful vision: to make clean, safe water 
                accessible to everyone through smart technology. What started as a small team of engineers and 
                environmental enthusiasts has grown into a leading IoT water purification company.
              </p>
              <p className="text-blue-700 leading-relaxed">
                Today, we serve thousands of homes and businesses across the country, helping them monitor and 
                maintain optimal water quality while reducing their environmental footprint. Our commitment to 
                innovation and sustainability drives everything we do.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">IoT Technology</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Sustainability</Badge>
                <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">Innovation</Badge>
              </div>
            </div>
            <Card className="border-white/20 bg-white/70 backdrop-blur-lg shadow-2xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-900 mb-2">10,000+</h4>
                    <p className="text-blue-700 text-sm">Happy Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-900 mb-2">50+ Cities</h4>
                    <p className="text-blue-700 text-sm">Nationwide Coverage</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-900 mb-2">15+ Awards</h4>
                    <p className="text-blue-700 text-sm">Industry Recognition</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-900 mb-2">99.9%</h4>
                    <p className="text-blue-700 text-sm">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mission & Values */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <Card className="border-white/20 bg-white/70 backdrop-blur-lg shadow-2xl">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 leading-relaxed mb-6">
                  To revolutionize water purification by making smart, sustainable technology accessible to everyone. 
                  We believe that clean water is a fundamental human right, and our IoT solutions help ensure 
                  that right is protected.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-blue-700">Real-time water quality monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-blue-700">Sustainable purification methods</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-blue-700">24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 bg-white/70 backdrop-blur-lg shadow-2xl">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Innovation</h4>
                    <p className="text-blue-700 text-sm">Continuously pushing the boundaries of IoT technology</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Sustainability</h4>
                    <p className="text-blue-700 text-sm">Committed to environmental responsibility</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Quality</h4>
                    <p className="text-blue-700 text-sm">Delivering excellence in every product and service</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Community</h4>
                    <p className="text-blue-700 text-sm">Building a healthier world together</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Meet Our Team
            </h3>
            <p className="text-blue-700 max-w-2xl mx-auto mb-12">
              Our diverse team of engineers, designers, and environmental experts work together to create 
              innovative solutions for water purification.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-white/20 bg-white/70 backdrop-blur-lg shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Sarah Chen</h4>
                  <p className="text-blue-600 text-sm mb-2">CEO & Co-Founder</p>
                  <p className="text-blue-700 text-sm">Former water quality researcher with 15+ years experience</p>
                </CardContent>
              </Card>

              <Card className="border-white/20 bg-white/70 backdrop-blur-lg shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Michael Rodriguez</h4>
                  <p className="text-blue-600 text-sm mb-2">CTO</p>
                  <p className="text-blue-700 text-sm">IoT expert with background in smart city infrastructure</p>
                </CardContent>
              </Card>

              <Card className="border-white/20 bg-white/70 backdrop-blur-lg shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Globe className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Dr. Emily Watson</h4>
                  <p className="text-blue-600 text-sm mb-2">Head of Sustainability</p>
                  <p className="text-blue-700 text-sm">Environmental scientist focused on water conservation</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <Card className="border-white/20 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust PurityGrid for their water purification needs. 
                Get in touch with our team today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/user/signup">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Get Started
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 