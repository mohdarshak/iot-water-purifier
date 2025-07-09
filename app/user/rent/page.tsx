"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplets, Check, Star, ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PurifierPlan {
  id: string
  name: string
  type: "RO" | "UV" | "UF"
  price: number
  features: string[]
  popular?: boolean
  description: string
}

export default function RentPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const router = useRouter()

  const plans: PurifierPlan[] = [
    {
      id: "uv",
      name: "UV Purifier",
      type: "UV",
      price: 500,
      description: "Perfect for homes with municipal water supply",
      features: [
        "UV sterilization technology",
        "Kills 99.9% bacteria & viruses",
        "No electricity required for purification",
        "Retains essential minerals",
        "6-month filter replacement",
        "24/7 customer support",
      ],
    },
    {
      id: "uf",
      name: "UF Purifier",
      type: "UF",
      price: 600,
      description: "Advanced filtration for better water quality",
      popular: true,
      features: [
        "Ultra-filtration technology",
        "Removes bacteria, viruses & cysts",
        "No wastage of water",
        "Retains natural minerals",
        "4-month filter replacement",
        "Free installation & maintenance",
        "Water quality monitoring",
      ],
    },
    {
      id: "ro",
      name: "RO Purifier",
      type: "RO",
      price: 800,
      description: "Complete water purification solution",
      features: [
        "Reverse Osmosis technology",
        "Removes all impurities & TDS",
        "Multi-stage filtration",
        "Mineral enhancement",
        "Storage tank included",
        "3-month filter replacement",
        "IoT monitoring & alerts",
        "Priority customer support",
      ],
    },
  ]

  const handleRentNow = (planId: string) => {
    setSelectedPlan(planId)
    // Simulate rental process
    setTimeout(() => {
      alert("Rental request submitted! Our team will contact you within 24 hours.")
      router.push("/user/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-gradient-to-br from-blue-100/20 to-purple-100/20"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-900">PurityGrid</h1>
            </div>
            <Link href="/user/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Rent Water Purifiers
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Choose from our premium range of water purifiers. All plans include installation, maintenance, and 24/7
            support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`border-white/30 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Droplets className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-blue-600 mb-4">{plan.description}</CardDescription>
                <div className="text-center">
                  <span className="text-4xl font-bold text-blue-900">₹{plan.price}</span>
                  <span className="text-blue-600">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-blue-800">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleRentNow(plan.id)}
                  disabled={selectedPlan === plan.id}
                  className={`w-full mt-6 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  {selectedPlan === plan.id ? (
                    "Processing..."
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Rent Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 text-center">Technology Comparison</CardTitle>
            <CardDescription className="text-blue-600 text-center">
              Choose the right purification technology for your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left py-3 px-4 text-blue-900 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 text-blue-900 font-semibold">UV</th>
                    <th className="text-center py-3 px-4 text-blue-900 font-semibold">UF</th>
                    <th className="text-center py-3 px-4 text-blue-900 font-semibold">RO</th>
                  </tr>
                </thead>
                <tbody className="text-blue-800">
                  <tr className="border-b border-blue-100">
                    <td className="py-3 px-4">Removes Bacteria & Viruses</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 px-4">Removes TDS & Heavy Metals</td>
                    <td className="text-center py-3 px-4">✗</td>
                    <td className="text-center py-3 px-4">✗</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 px-4">Retains Essential Minerals</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓*</td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 px-4">No Water Wastage</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✗</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Best For</td>
                    <td className="text-center py-3 px-4">Municipal Water</td>
                    <td className="text-center py-3 px-4">Low TDS Water</td>
                    <td className="text-center py-3 px-4">High TDS Water</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-blue-600 mt-4">* With mineral enhancement technology</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
