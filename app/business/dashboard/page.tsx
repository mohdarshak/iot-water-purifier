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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Building2,
  Droplets,
  Activity,
  LogOut,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Wrench,
} from "lucide-react"
import Link from "next/link"

interface DeviceData {
  device_id: string
  tds: string
  flow: string
  temprature: string
  filter_type: string
  timestamp: string
  ph: string
  filter_health: string
  location: string
  status: "online" | "offline" | "maintenance"
}

export default function BusinessDashboard() {
  const [devices, setDevices] = useState<DeviceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDevice, setSelectedDevice] = useState<string>("all")

  const fetchDevicesData = async () => {
    try {
      setIsLoading(true)
      // Fetch real data from API
      const response = await fetch(
        "https://qsh6ornnqxfn4ryi77dsy3sxyi0cbrsb.lambda-url.eu-north-1.on.aws/?device_id=223",
      )
      const realData = await response.json()

      // Simulate multiple devices data based on real API response
      const mockDevices: DeviceData[] = [
        {
          ...realData,
          location: "Main Kitchen",
          status: "online",
        },
        {
          device_id: "224",
          tds: (Number.parseInt(realData.tds) + Math.floor(Math.random() * 30 - 15)).toString(),
          flow: (Number.parseFloat(realData.flow) + Math.random() * 2 - 1).toFixed(1),
          temprature: (Number.parseFloat(realData.temprature) + Math.random() * 4 - 2).toFixed(1),
          filter_type: "UF",
          timestamp: new Date().toISOString(),
          ph: (Number.parseFloat(realData.ph) + Math.random() * 0.6 - 0.3).toFixed(2),
          filter_health: (Number.parseFloat(realData.filter_health) + Math.random() * 40).toFixed(1),
          location: "Break Room",
          status: "online",
        },
        {
          device_id: "225",
          tds: (Number.parseInt(realData.tds) + Math.floor(Math.random() * 40 - 20)).toString(),
          flow: (Number.parseFloat(realData.flow) + Math.random() * 1.5 - 0.75).toFixed(1),
          temprature: (Number.parseFloat(realData.temprature) + Math.random() * 3 - 1.5).toFixed(1),
          filter_type: "UV",
          timestamp: new Date().toISOString(),
          ph: (Number.parseFloat(realData.ph) + Math.random() * 0.4 - 0.2).toFixed(2),
          filter_health: (Number.parseFloat(realData.filter_health) + Math.random() * 20).toFixed(1),
          location: "Reception Area",
          status: "maintenance",
        },
        {
          device_id: "226",
          tds: (Number.parseInt(realData.tds) + Math.floor(Math.random() * 25 - 12)).toString(),
          flow: (Number.parseFloat(realData.flow) + Math.random() * 3 - 1.5).toFixed(1),
          temprature: (Number.parseFloat(realData.temprature) + Math.random() * 2 - 1).toFixed(1),
          filter_type: "RO",
          timestamp: new Date().toISOString(),
          ph: (Number.parseFloat(realData.ph) + Math.random() * 0.8 - 0.4).toFixed(2),
          filter_health: (Number.parseFloat(realData.filter_health) + Math.random() * 60).toFixed(1),
          location: "Conference Room",
          status: "online",
        },
      ]
      setDevices(mockDevices)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDevicesData()
    const interval = setInterval(fetchDevicesData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-red-500"
      case "maintenance":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAlertLevel = (device: DeviceData) => {
    const filterHealth = Number.parseFloat(device.filter_health)
    const ph = Number.parseFloat(device.ph)
    const tds = Number.parseInt(device.tds)

    if (filterHealth < 20 || ph < 6.5 || ph > 8.5 || tds > 300) {
      return "high"
    }
    if (filterHealth < 40 || tds > 250) {
      return "medium"
    }
    return "low"
  }

  // Generate chart data
  const deviceStatusData = [
    { name: "Online", value: devices.filter((d) => d.status === "online").length, color: "#10b981" },
    { name: "Maintenance", value: devices.filter((d) => d.status === "maintenance").length, color: "#f59e0b" },
    { name: "Offline", value: devices.filter((d) => d.status === "offline").length, color: "#ef4444" },
  ]

  const avgMetrics = devices.reduce(
    (acc, device) => {
      acc.ph += Number.parseFloat(device.ph)
      acc.tds += Number.parseInt(device.tds)
      acc.temperature += Number.parseFloat(device.temprature)
      acc.flow += Number.parseFloat(device.flow)
      return acc
    },
    { ph: 0, tds: 0, temperature: 0, flow: 0 },
  )

  if (devices.length > 0) {
    avgMetrics.ph /= devices.length
    avgMetrics.tds /= devices.length
    avgMetrics.temperature /= devices.length
    avgMetrics.flow /= devices.length
  }

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    time: `${23 - i}:00`,
    avgPh: (avgMetrics.ph + (Math.random() - 0.5) * 0.3).toFixed(2),
    avgTds: Math.floor(avgMetrics.tds + (Math.random() - 0.5) * 30),
    totalFlow: (avgMetrics.flow * devices.length + (Math.random() - 0.5) * 5).toFixed(2),
  }))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-blue-700">Loading business analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-900">Business Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/business/income">
                <Button variant="outline" size="sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Income
                </Button>
              </Link>
              <Link href="/business/maintenance">
                <Button variant="outline" size="sm">
                  <Wrench className="h-4 w-4 mr-2" />
                  Maintenance
                </Button>
              </Link>
              <Button onClick={fetchDevicesData} variant="outline" size="sm">
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
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Devices</CardTitle>
              <Droplets className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{devices.length}</div>
              <p className="text-xs text-blue-600 mt-1">{devices.filter((d) => d.status === "online").length} online</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Avg pH Level</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{avgMetrics.ph.toFixed(2)}</div>
              <p className="text-xs text-blue-600 mt-1">Across all devices</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Flow Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {(avgMetrics.flow * devices.length).toFixed(1)} L/min
              </div>
              <p className="text-xs text-blue-600 mt-1">Combined output</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {devices.filter((d) => getAlertLevel(d) === "high").length}
              </div>
              <p className="text-xs text-blue-600 mt-1">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Device Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Device Status Distribution</CardTitle>
              <CardDescription className="text-blue-600">Current status of all devices</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  online: { label: "Online", color: "#10b981" },
                  maintenance: { label: "Maintenance", color: "#f59e0b" },
                  offline: { label: "Offline", color: "#ef4444" },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deviceStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                      {deviceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-blue-200 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-900">Device Locations & Status</CardTitle>
              <CardDescription className="text-blue-600">Real-time device monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.device_id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}></div>
                      <div>
                        <p className="font-medium text-blue-900">Device {device.device_id}</p>
                        <p className="text-sm text-blue-600">{device.location}</p>
                        <p className="text-xs text-blue-500">{device.filter_type} Filter</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          getAlertLevel(device) === "high"
                            ? "destructive"
                            : getAlertLevel(device) === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {getAlertLevel(device) === "high"
                          ? "Alert"
                          : getAlertLevel(device) === "medium"
                            ? "Warning"
                            : "Normal"}
                      </Badge>
                      <p className="text-xs text-blue-600 mt-1">pH: {Number.parseFloat(device.ph).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Average pH Trends</CardTitle>
              <CardDescription className="text-blue-600">24-hour pH monitoring across all devices</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  avgPh: {
                    label: "Average pH",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[6, 8]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="avgPh" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Total Flow Rate</CardTitle>
              <CardDescription className="text-blue-600">Combined water flow from all devices</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  totalFlow: {
                    label: "Total Flow (L/min)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="totalFlow" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Average TDS Levels</CardTitle>
              <CardDescription className="text-blue-600">Total Dissolved Solids monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  avgTds: {
                    label: "Average TDS (ppm)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="avgTds" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Filter Health Overview</CardTitle>
              <CardDescription className="text-blue-600">Filter replacement status across devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.device_id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-900">
                        {device.location} (Device {device.device_id})
                      </span>
                      <span className="text-sm text-blue-600">
                        {Number.parseFloat(device.filter_health).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={Number.parseFloat(device.filter_health)} className="h-2" />
                    {Number.parseFloat(device.filter_health) < 20 && (
                      <p className="text-xs text-red-600 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Replace filter immediately
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <Card className="border-blue-200 mt-6">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Active Alerts
            </CardTitle>
            <CardDescription className="text-blue-600">Devices requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {devices
                .filter((device) => getAlertLevel(device) === "high")
                .map((device) => (
                  <div
                    key={device.device_id}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">
                          Device {device.device_id} - {device.location}
                        </p>
                        <p className="text-sm text-red-700">
                          {Number.parseFloat(device.filter_health) < 20 && "Filter needs replacement • "}
                          {(Number.parseFloat(device.ph) < 6.5 || Number.parseFloat(device.ph) > 8.5) &&
                            "pH out of range • "}
                          {Number.parseInt(device.tds) > 300 && "High TDS levels"}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              {devices.filter((device) => getAlertLevel(device) === "high").length === 0 && (
                <p className="text-center text-blue-600 py-4">No active alerts - all systems operating normally</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
