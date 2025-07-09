"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { Droplets, Thermometer, Activity, Filter, LogOut, RefreshCw, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface WaterData {
  tds: string
  flow: string
  temprature: string
  filter_type: string
  timestamp: string
  device_id: string
  ph: string
  filter_health: string
}

export default function UserDashboard() {
  const [waterData, setWaterData] = useState<WaterData | null>(null)
  const [historicalData, setHistoricalData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchWaterData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        "https://qsh6ornnqxfn4ryi77dsy3sxyi0cbrsb.lambda-url.eu-north-1.on.aws/?device_id=223",
      )
      const data = await response.json()
      setWaterData(data)

      // Generate some historical data for charts
      const historical = Array.from({ length: 24 }, (_, i) => ({
        time: `${23 - i}:00`,
        ph: (Number.parseFloat(data.ph) + (Math.random() - 0.5) * 0.5).toFixed(2),
        tds: Math.floor(Number.parseInt(data.tds) + (Math.random() - 0.5) * 50),
        temperature: (Number.parseFloat(data.temprature) + (Math.random() - 0.5) * 3).toFixed(1),
        flow: (Number.parseFloat(data.flow) + (Math.random() - 0.5) * 1).toFixed(2),
      }))
      setHistoricalData(historical)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWaterData()
    const interval = setInterval(fetchWaterData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number, type: string) => {
    switch (type) {
      case "ph":
        return value >= 6.5 && value <= 8.5 ? "bg-green-500" : "bg-yellow-500"
      case "tds":
        return value <= 300 ? "bg-green-500" : value <= 500 ? "bg-yellow-500" : "bg-red-500"
      case "filter":
        return value > 20 ? "bg-green-500" : value > 10 ? "bg-yellow-500" : "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusText = (value: number, type: string) => {
    switch (type) {
      case "ph":
        return value >= 6.5 && value <= 8.5 ? "Optimal" : "Needs Attention"
      case "tds":
        return value <= 300 ? "Excellent" : value <= 500 ? "Good" : "Poor"
      case "filter":
        return value > 20 ? "Good" : value > 10 ? "Replace Soon" : "Replace Now"
      default:
        return "Normal"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-blue-700">Loading water quality data...</p>
        </div>
      </div>
    )
  }

  const phValue = Number.parseFloat(waterData?.ph || "0")
  const tdsValue = Number.parseInt(waterData?.tds || "0")
  const temperatureValue = Number.parseFloat(waterData?.temprature || "0")
  const filterHealthValue = Number.parseFloat(waterData?.filter_health || "0")
  const flowValue = Number.parseFloat(waterData?.flow || "0")

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
            <div className="flex items-center space-x-4">
              <Link href="/user/rent">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Rent Device
                </Button>
              </Link>
              <Link href="/user/billing">
                <Button variant="outline" size="sm">
                  View Bills
                </Button>
              </Link>
              <Button onClick={fetchWaterData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Device Status */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-blue-900">Device Status</h2>
            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none shadow-lg"
              >
                Device {waterData?.device_id} - Online
              </Badge>
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none shadow-lg"
              >
                {waterData?.filter_type} Filter
              </Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                pH Level
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <Activity className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{phValue.toFixed(2)}</div>
              <div className="flex items-center mt-2">
                <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(phValue, "ph")}`}></div>
                <p className="text-xs text-blue-600">{getStatusText(phValue, "ph")}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TDS Level
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <Droplets className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{tdsValue} ppm</div>
              <div className="flex items-center mt-2">
                <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(tdsValue, "tds")}`}></div>
                <p className="text-xs text-blue-600">{getStatusText(tdsValue, "tds")}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Temperature
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <Thermometer className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{temperatureValue}°C</div>
              <p className="text-xs text-blue-600 mt-2">Normal Range</p>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Filter Health
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <Filter className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{filterHealthValue.toFixed(1)}%</div>
              <Progress value={filterHealthValue} className="mt-2" />
              <p className="text-xs text-blue-600 mt-1">{getStatusText(filterHealthValue, "filter")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">pH Levels (24h)</CardTitle>
              <CardDescription className="text-blue-600">Hourly pH monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  ph: {
                    label: "pH Level",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[6, 8]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">TDS Levels (24h)</CardTitle>
              <CardDescription className="text-blue-600">Total Dissolved Solids monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  tds: {
                    label: "TDS (ppm)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="tds" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Temperature Trend</CardTitle>
              <CardDescription className="text-blue-600">Water temperature over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  temperature: {
                    label: "Temperature (°C)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="temperature" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Flow Rate</CardTitle>
              <CardDescription className="text-blue-600">Water flow monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  flow: {
                    label: "Flow Rate",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="flow" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Current Flow Rate */}
        <Card className="border-blue-200 mt-6">
          <CardHeader>
            <CardTitle className="text-blue-900">Current Flow Rate</CardTitle>
            <CardDescription className="text-blue-600">Real-time water flow measurement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">{flowValue.toFixed(2)} L/min</div>
              <p className="text-blue-600">Current flow rate</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
