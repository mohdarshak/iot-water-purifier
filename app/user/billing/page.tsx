"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { Droplets, ArrowLeft, Download, CreditCard, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Bill {
  id: string
  month: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
  deviceType: string
  usageHours: number
}

export default function BillingPage() {
  const [bills] = useState<Bill[]>([
    {
      id: "B001",
      month: "December 2024",
      amount: 600,
      dueDate: "2024-12-31",
      status: "pending",
      deviceType: "UF Purifier",
      usageHours: 720,
    },
    {
      id: "B002",
      month: "November 2024",
      amount: 600,
      dueDate: "2024-11-30",
      status: "paid",
      deviceType: "UF Purifier",
      usageHours: 680,
    },
    {
      id: "B003",
      month: "October 2024",
      amount: 600,
      dueDate: "2024-10-31",
      status: "paid",
      deviceType: "UF Purifier",
      usageHours: 710,
    },
    {
      id: "B004",
      month: "September 2024",
      amount: 600,
      dueDate: "2024-09-30",
      status: "paid",
      deviceType: "UF Purifier",
      usageHours: 695,
    },
    {
      id: "B005",
      month: "August 2024",
      amount: 600,
      dueDate: "2024-08-31",
      status: "paid",
      deviceType: "UF Purifier",
      usageHours: 730,
    },
    {
      id: "B006",
      month: "July 2024",
      amount: 600,
      dueDate: "2024-07-31",
      status: "paid",
      deviceType: "UF Purifier",
      usageHours: 720,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "overdue":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid"
      case "pending":
        return "Pending"
      case "overdue":
        return "Overdue"
      default:
        return "Unknown"
    }
  }

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0)
  const paidAmount = bills.filter((bill) => bill.status === "paid").reduce((sum, bill) => sum + bill.amount, 0)
  const pendingAmount = bills.filter((bill) => bill.status === "pending").reduce((sum, bill) => sum + bill.amount, 0)

  const chartData = bills.reverse().map((bill) => ({
    month: bill.month.split(" ")[0],
    amount: bill.amount,
    usage: bill.usageHours,
  }))

  const handlePayNow = (billId: string) => {
    alert(`Payment gateway would open for bill ${billId}`)
  }

  const handleDownloadBill = (billId: string) => {
    alert(`Downloading bill ${billId}`)
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
              <h1 className="text-xl font-bold text-blue-900">PurityGrid - Billing</h1>
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
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Total Billed
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">₹{totalAmount.toLocaleString()}</div>
              <p className="text-xs text-blue-600 mt-1">Last 6 months</p>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Amount Paid
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">₹{paidAmount.toLocaleString()}</div>
              <p className="text-xs text-green-600 mt-1">Successfully paid</p>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Pending Amount
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg shadow-lg">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">₹{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-yellow-600 mt-1">Due for payment</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Monthly Billing Trend</CardTitle>
              <CardDescription className="text-blue-600">Your monthly rental charges</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    label: "Amount (₹)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Device Usage Hours</CardTitle>
              <CardDescription className="text-blue-600">Monthly device usage tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  usage: {
                    label: "Usage Hours",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="usage" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bills List */}
        <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-900">Billing History</CardTitle>
            <CardDescription className="text-blue-600">Your complete billing records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-blue-900">{bill.month}</span>
                      <span className="text-sm text-blue-600">{bill.deviceType}</span>
                      <span className="text-xs text-blue-500">Due: {bill.dueDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-900">₹{bill.amount}</div>
                      <div className="text-sm text-blue-600">{bill.usageHours}h usage</div>
                    </div>

                    <Badge variant="outline" className={`${getStatusColor(bill.status)} text-white border-none`}>
                      {getStatusText(bill.status)}
                    </Badge>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadBill(bill.id)}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {bill.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handlePayNow(bill.id)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                        >
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
