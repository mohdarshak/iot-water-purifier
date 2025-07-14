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
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/authContext"
import { useRouter } from "next/navigation"
import { getRequests, updateRequestStatus, RentalRequest } from "@/lib/rentalRequests"

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
  const { user, userType } = useAuth()
  const router = useRouter()

  // Redirect to login if not logged in or not a business
  useEffect(() => {
    if (!user || userType !== "Business") {
      router.replace("/login")
    }
  }, [user, userType, router])

  // Type guard for Owner
  function isOwner(u: any): u is import("@/lib/mockData").Owner {
    return u && u.type === "Business" && Array.isArray(u.supplied_purifiers)
  }

  // Use the logged-in owner's purifiers
  const suppliedPurifiers = isOwner(user) ? user.supplied_purifiers : []

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
      // setDevices(mockDevices) // This line is no longer needed as we use suppliedPurifiers directly
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // fetchDevicesData() // This line is no longer needed as we use suppliedPurifiers directly
    const interval = setInterval(fetchDevicesData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Add mock income to each device
  const devicesWithIncome = suppliedPurifiers.map((d, i) => ({
    ...d,
    income: Math.floor(5000 + Math.random() * 10000), // mock income in INR
  }))
  const totalIncome = devicesWithIncome.reduce((sum, d) => sum + d.income, 0)

  // Earnings Dashboard Data
  // Generate mock monthly stats for the last 6 months
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    return d.toLocaleString('default', { month: 'short', year: '2-digit' })
  }).reverse()
  // For demo, randomly distribute totalIncome across months
  const monthlyStats = months.map((month, i) => ({
    month,
    income: Math.floor(totalIncome / 6 + (Math.random() - 0.5) * 0.2 * totalIncome),
  }))
  const monthlyTotal = monthlyStats.reduce((sum, m) => sum + m.income, 0)

  // Helper to estimate days left before service based on filter_health
  const getDaysLeft = (filterHealth: string) => {
    const health = Number.parseFloat(filterHealth)
    // Assume 100 = new, 0 = needs service, 1 health = 1.5 days left
    return Math.max(0, Math.round(health * 1.5))
  }

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
    { name: "Online", value: suppliedPurifiers.filter((d) => d.status === "online").length, color: "#10b981" },
    { name: "Maintenance", value: suppliedPurifiers.filter((d) => d.status === "maintenance").length, color: "#f59e0b" },
    { name: "Offline", value: suppliedPurifiers.filter((d) => d.status === "offline").length, color: "#ef4444" },
  ]

  const avgMetrics = suppliedPurifiers.reduce(
    (acc, device) => {
      acc.ph += Number.parseFloat(device.ph)
      acc.tds += Number.parseInt(device.tds)
      acc.temperature += Number.parseFloat(device.temprature)
      acc.flow += Number.parseFloat(device.flow)
      return acc
    },
    { ph: 0, tds: 0, temperature: 0, flow: 0 },
  )

  if (suppliedPurifiers.length > 0) {
    avgMetrics.ph /= suppliedPurifiers.length
    avgMetrics.tds /= suppliedPurifiers.length
    avgMetrics.temperature /= suppliedPurifiers.length
    avgMetrics.flow /= suppliedPurifiers.length
  }

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    time: `${23 - i}:00`,
    avgPh: (avgMetrics.ph + (Math.random() - 0.5) * 0.3).toFixed(2),
    avgTds: Math.floor(avgMetrics.tds + (Math.random() - 0.5) * 30),
    totalFlow: (avgMetrics.flow * suppliedPurifiers.length + (Math.random() - 0.5) * 5).toFixed(2),
  }))

  // Rental Requests (mocked)
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([])
  // Load requests on mount
  useEffect(() => {
    setRentalRequests(getRequests())
    const interval = setInterval(() => setRentalRequests(getRequests()), 2000)
    return () => clearInterval(interval)
  }, [])
  function handleRequestAction(id: string, action: "accepted" | "rejected") {
    updateRequestStatus(id, action)
    setRentalRequests(getRequests())
  }

  // Alerts & Reminders
  const purifierAlerts = suppliedPurifiers
    .map((device) => {
      const filterHealth = Number.parseFloat(device.filter_health)
      const tds = Number.parseInt(device.tds)
      const ph = Number.parseFloat(device.ph)
      const alerts: string[] = []
      if (filterHealth < 20) alerts.push("Low Filter Health")
      if (tds > 250) alerts.push("High TDS")
      if (ph < 6.5 || ph > 8.5) alerts.push("pH Out of Range")
      if (device.status === "maintenance") alerts.push("Maintenance Required")
      if (device.status === "offline") alerts.push("Device Offline")
      if ((device as any).subscription_days_left !== undefined && (device as any).subscription_days_left < 7) alerts.push("Subscription Expiring Soon")
      return alerts.length > 0 ? { device, alerts } : null
    })
    .filter(Boolean) as { device: any; alerts: string[] }[]

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

      {/* Alerts & Reminders Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-blue-900">Alerts & Reminders</CardTitle>
            <CardDescription>Devices needing attention or with expiring subscriptions.</CardDescription>
          </CardHeader>
          <CardContent>
            {purifierAlerts.length === 0 && (
              <div className="text-blue-600">No alerts or reminders at this time.</div>
            )}
            <div className="space-y-4">
              {purifierAlerts.map(({ device, alerts }) => (
                <div key={device.device_id} className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/80 rounded-lg shadow p-4 border border-blue-100">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-semibold text-blue-900">Device {device.device_id}</span>
                    <span className="text-blue-700">({device.location})</span>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">{device.filter_type}</Badge>
                    <span className="text-xs text-blue-500 ml-2">Last updated: {new Date(device.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                    {alerts.map((alert, idx) => (
                      <Badge
                        key={idx}
                        className={
                          alert === "Low Filter Health"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : alert === "High TDS"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : alert === "pH Out of Range"
                            ? "bg-orange-100 text-orange-800 border-orange-200"
                            : alert === "Maintenance Required"
                            ? "bg-purple-100 text-purple-800 border-purple-200"
                            : alert === "Device Offline"
                            ? "bg-gray-200 text-gray-800 border-gray-300"
                            : alert === "Subscription Expiring Soon"
                            ? "bg-pink-100 text-pink-800 border-pink-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }
                      >
                        {alert}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rental Requests Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-blue-900">Rental Requests</CardTitle>
            <CardDescription>Approve or reject new purifier rental requests from users.</CardDescription>
          </CardHeader>
          <CardContent>
            {rentalRequests.length === 0 && (
              <div className="text-blue-600">No rental requests at this time.</div>
            )}
            <div className="space-y-4">
              {rentalRequests.map(req => (
                <div key={req.id} className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/80 rounded-lg shadow p-4 border border-blue-100">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-semibold text-blue-900">{req.userName}</span>
                    <span className="text-blue-700">({req.userEmail}, {req.userPhone})</span>
                    <span className="text-blue-700">requests</span>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">{req.model}</Badge>
                    <span className="text-blue-700">at</span>
                    <span className="font-medium text-blue-900">{req.location}</span>
                    <span className="text-xs text-blue-500 ml-2">{new Date(req.date).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    {req.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-green-500 text-white" onClick={() => handleRequestAction(req.id, "accepted")}> <CheckCircle className="h-4 w-4 mr-1" /> Accept </Button>
                        <Button size="sm" className="bg-red-500 text-white" onClick={() => handleRequestAction(req.id, "rejected")}> <XCircle className="h-4 w-4 mr-1" /> Reject </Button>
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 ml-2"><Clock className="h-3 w-3 mr-1 inline" /> Pending</Badge>
                      </>
                    )}
                    {req.status === "accepted" && (
                      <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1 inline" /> Accepted</Badge>
                    )}
                    {req.status === "rejected" && (
                      <Badge className="bg-red-100 text-red-700 border-red-200"><XCircle className="h-3 w-3 mr-1 inline" /> Rejected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Dashboard Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-blue-900">Earnings Dashboard</CardTitle>
            <CardDescription>Track your total and monthly income from all supplied purifiers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-xs text-blue-600 mb-1">Total Income</div>
                <div className="text-3xl font-bold text-blue-900 mb-1">₹{totalIncome.toLocaleString()}</div>
                <div className="text-xs text-blue-600">All time</div>
              </div>
              <div>
                <div className="text-xs text-blue-600 mb-1">Last Month</div>
                <div className="text-2xl font-bold text-blue-900 mb-1">₹{monthlyStats[monthlyStats.length-1].income.toLocaleString()}</div>
                <div className="text-xs text-blue-600">{monthlyStats[monthlyStats.length-1].month}</div>
              </div>
              <div>
                <div className="text-xs text-blue-600 mb-1">6-Month Total</div>
                <div className="text-2xl font-bold text-blue-900 mb-1">₹{monthlyTotal.toLocaleString()}</div>
                <div className="text-xs text-blue-600">Last 6 months</div>
              </div>
            </div>
            <div className="h-64">
              <ChartContainer
                config={{ income: { label: "Income", color: "#3b82f6" } }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="income" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            {/* Per-Device Earnings Table */}
            <div className="mt-8">
              <div className="text-lg font-semibold text-blue-900 mb-2">Earnings by Device</div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white/80 rounded-lg shadow">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-bold text-blue-700">Device</th>
                      <th className="px-4 py-2 text-left text-xs font-bold text-blue-700">Location</th>
                      <th className="px-4 py-2 text-left text-xs font-bold text-blue-700">Filter Type</th>
                      <th className="px-4 py-2 text-right text-xs font-bold text-blue-700">Income (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devicesWithIncome
                      .slice()
                      .sort((a, b) => b.income - a.income)
                      .map((device) => (
                        <tr key={device.device_id} className="border-b border-blue-100">
                          <td className="px-4 py-2 font-medium text-blue-900">{device.device_id}</td>
                          <td className="px-4 py-2 text-blue-700">{device.location}</td>
                          <td className="px-4 py-2 text-blue-700">{device.filter_type}</td>
                          <td className="px-4 py-2 text-right text-blue-900 font-semibold">{device.income.toLocaleString()}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Devices</CardTitle>
              <Droplets className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{devicesWithIncome.length}</div>
              <p className="text-xs text-blue-600 mt-1">{devicesWithIncome.filter((d) => d.status === "online").length} online</p>
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
                {(avgMetrics.flow * suppliedPurifiers.length).toFixed(1)} L/min
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
                {suppliedPurifiers.filter((d) => getAlertLevel(d) === "high").length}
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
                {suppliedPurifiers.map((device) => (
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
                {suppliedPurifiers.map((device) => (
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
              {suppliedPurifiers
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
              {suppliedPurifiers.filter((device) => getAlertLevel(device) === "high").length === 0 && (
                <p className="text-center text-blue-600 py-4">No active alerts - all systems operating normally</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Purifier Fleet Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Your Purifier Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devicesWithIncome.map((device) => (
              <Card key={device.device_id} className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center gap-2">
                    Device {device.device_id}
                    <Badge className="ml-2">{device.status}</Badge>
                  </CardTitle>
                  <CardDescription className="text-blue-600">{device.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-medium">Service in:</span>
                    <span className="font-bold text-blue-900">{getDaysLeft(device.filter_health)} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-medium">Money Made:</span>
                    <span className="font-bold text-green-700">₹{device.income.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-medium">Filter Health:</span>
                    <span className="font-bold text-blue-900">{Number(device.filter_health).toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* End Purifier Fleet Cards */}
      </div>
    </div>
  )
}
