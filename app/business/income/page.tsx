"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Building2, ArrowLeft, TrendingUp, DollarSign, Users, Calendar } from "lucide-react"
import Link from "next/link"

interface IncomeData {
  month: string
  roIncome: number
  uvIncome: number
  ufIncome: number
  totalIncome: number
  customers: number
}

export default function BusinessIncomePage() {
  const [incomeData] = useState<IncomeData[]>([
    {
      month: "July 2024",
      roIncome: 48000,
      uvIncome: 25000,
      ufIncome: 36000,
      totalIncome: 109000,
      customers: 182,
    },
    {
      month: "August 2024",
      roIncome: 52000,
      uvIncome: 27500,
      ufIncome: 39000,
      totalIncome: 118500,
      customers: 195,
    },
    {
      month: "September 2024",
      roIncome: 56000,
      uvIncome: 30000,
      ufIncome: 42000,
      totalIncome: 128000,
      customers: 210,
    },
    {
      month: "October 2024",
      roIncome: 60000,
      uvIncome: 32500,
      ufIncome: 45000,
      totalIncome: 137500,
      customers: 225,
    },
    {
      month: "November 2024",
      roIncome: 64000,
      uvIncome: 35000,
      ufIncome: 48000,
      totalIncome: 147000,
      customers: 240,
    },
    {
      month: "December 2024",
      roIncome: 68000,
      uvIncome: 37500,
      ufIncome: 51000,
      totalIncome: 156500,
      customers: 255,
    },
  ])

  const currentMonth = incomeData[incomeData.length - 1]
  const previousMonth = incomeData[incomeData.length - 2]
  const growthRate = ((currentMonth.totalIncome - previousMonth.totalIncome) / previousMonth.totalIncome) * 100

  const deviceTypeData = [
    { name: "RO Purifiers", value: currentMonth.roIncome, color: "#3b82f6", count: 85 },
    { name: "UF Purifiers", value: currentMonth.ufIncome, color: "#10b981", count: 85 },
    { name: "UV Purifiers", value: currentMonth.uvIncome, color: "#f59e0b", count: 75 },
  ]

  const chartData = incomeData.map((data) => ({
    month: data.month.split(" ")[0],
    RO: data.roIncome,
    UF: data.ufIncome,
    UV: data.uvIncome,
    total: data.totalIncome,
    customers: data.customers,
  }))

  const totalYearlyIncome = incomeData.reduce((sum, data) => sum + data.totalIncome, 0)
  const averageMonthlyIncome = totalYearlyIncome / incomeData.length

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
              <Building2 className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-900">PurityGrid - Income Analytics</h1>
            </div>
            <Link href="/business/dashboard">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Monthly Income
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">₹{currentMonth.totalIncome.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <p className="text-xs text-green-600">+{growthRate.toFixed(1)}% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Total Customers
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{currentMonth.customers}</div>
              <p className="text-xs text-green-600 mt-1">Active subscribers</p>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Average Monthly
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">₹{averageMonthlyIncome.toLocaleString()}</div>
              <p className="text-xs text-purple-600 mt-1">6-month average</p>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Yearly Total
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">₹{totalYearlyIncome.toLocaleString()}</div>
              <p className="text-xs text-orange-600 mt-1">Last 6 months</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Monthly Income Trend</CardTitle>
              <CardDescription className="text-blue-600">Total income growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  total: {
                    label: "Total Income (₹)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="total" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Income by Device Type</CardTitle>
              <CardDescription className="text-blue-600">Current month breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  ro: { label: "RO", color: "#3b82f6" },
                  uf: { label: "UF", color: "#10b981" },
                  uv: { label: "UV", color: "#f59e0b" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deviceTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} dataKey="value">
                      {deviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Device Type Performance</CardTitle>
              <CardDescription className="text-blue-600">Monthly income by device category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  RO: { label: "RO Purifiers", color: "#3b82f6" },
                  UF: { label: "UF Purifiers", color: "#10b981" },
                  UV: { label: "UV Purifiers", color: "#f59e0b" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="RO" fill="#3b82f6" />
                    <Bar dataKey="UF" fill="#10b981" />
                    <Bar dataKey="UV" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Customer Growth</CardTitle>
              <CardDescription className="text-blue-600">Active customer base expansion</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  customers: {
                    label: "Customers",
                    color: "hsl(var(--chart-2))",
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
                    <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Device Type Details */}
        <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-900">Device Type Revenue Breakdown</CardTitle>
            <CardDescription className="text-blue-600">
              Detailed performance metrics for each device type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deviceTypeData.map((device, index) => (
                <div key={index} className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-blue-900">{device.name}</h3>
                    <Badge style={{ backgroundColor: device.color }} className="text-white border-none">
                      {device.count} units
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 mb-2">₹{device.value.toLocaleString()}</div>
                  <div className="text-sm text-blue-600">
                    Average: ₹{Math.round(device.value / device.count)} per unit
                  </div>
                  <div className="text-xs text-blue-500 mt-1">
                    {((device.value / currentMonth.totalIncome) * 100).toFixed(1)}% of total income
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
