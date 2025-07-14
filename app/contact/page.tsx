import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Droplets, Mail, Phone, MapPin, Clock, Send, ArrowLeft } from 'lucide-react'

export default function ContactPage() {
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
              <Link href="/about" className="text-blue-700 hover:text-blue-900">
                About
              </Link>
              <Link href="/contact" className="text-blue-700 hover:text-blue-900 font-semibold">
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
              Get in Touch
            </h2>
            <p className="text-xl text-blue-800/80 max-w-2xl mx-auto">
              Have questions about our IoT water purification systems? We're here to help you find the perfect solution.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-white/20 bg-white/70 backdrop-blur-lg shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-blue-600">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">First Name</label>
                    <Input 
                      placeholder="John" 
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">Last Name</label>
                    <Input 
                      placeholder="Doe" 
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Email</label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Phone</label>
                  <Input 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Subject</label>
                  <Input 
                    placeholder="Product Inquiry" 
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us about your water purification needs..." 
                    rows={5}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-white/20 bg-white/70 backdrop-blur-lg shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Email</h4>
                      <p className="text-blue-700">support@puritygrid.com</p>
                      <p className="text-blue-700">sales@puritygrid.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Phone</h4>
                      <p className="text-blue-700">+1 (555) 123-4567</p>
                      <p className="text-blue-700">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Address</h4>
                      <p className="text-blue-700">123 Innovation Drive</p>
                      <p className="text-blue-700">Tech City, TC 12345</p>
                      <p className="text-blue-700">United States</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Business Hours</h4>
                      <p className="text-blue-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-blue-700">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-blue-700">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="border-white/20 bg-white/70 backdrop-blur-lg shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b border-blue-100 pb-4">
                    <h5 className="font-semibold text-blue-900 mb-2">How long does installation take?</h5>
                    <p className="text-blue-700 text-sm">Professional installation typically takes 2-4 hours depending on your setup.</p>
                  </div>
                  <div className="border-b border-blue-100 pb-4">
                    <h5 className="font-semibold text-blue-900 mb-2">What's included in the warranty?</h5>
                    <p className="text-blue-700 text-sm">We offer a 3-year warranty on all hardware and 1-year on software.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-2">Do you offer maintenance services?</h5>
                    <p className="text-blue-700 text-sm">Yes, we provide comprehensive maintenance packages and 24/7 support.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 