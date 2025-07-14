"use client"
import React, { useState, useEffect } from "react"
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
import { Droplets, Thermometer, Activity, Filter, LogOut, RefreshCw, ShoppingCart, Wifi, WifiOff, BarChart3 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useAuth } from "@/lib/authContext"
import { useRouter } from "next/navigation"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import type { Purifier, PurifierModel } from "@/lib/mockData"
import { addRequest } from "@/lib/rentalRequests"

// Type guard for User
function isUser(u: any): u is import("@/lib/mockData").User {
  return u && u.type === "User" && Array.isArray(u.rented_purifiers)
}

export default function UserDashboard() {
  const { user, userType, login: authLogin } = useAuth()
  const router = useRouter()

  // Redirect to login if not logged in or not a user
  React.useEffect(() => {
    if (!user || userType !== "User") {
      router.replace("/login")
    }
  }, [user, userType, router])

  // Use the logged-in user's purifiers
  const rentedPurifiers = isUser(user) ? user.rented_purifiers as Purifier[] : []

  const [historicalData, setHistoricalData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [rentOpen, setRentOpen] = useState(false)
  const [newType, setNewType] = useState<PurifierModel>("UV")
  const [newLocation, setNewLocation] = useState("")
  const [booking, setBooking] = useState(false)

  // Generate 40 devices with varied data
  const generateDevices = (baseData: Purifier[]) => {
    const devices: Purifier[] = []
    for (let i = 0; i < 40; i++) {
      const baseDevice = baseData[i % baseData.length] || baseData[0]
      const deviceId = (220 + i).toString()
      devices.push({
        ...baseDevice,
        device_id: deviceId,
        tds: (Math.floor(Math.random() * 200) + 150).toString(),
        flow: (Math.random() * 4 + 0.5).toFixed(1),
        temprature: (Math.random() * 20 + 25).toFixed(1),
        ph: (Math.random() * 2 + 6.5).toFixed(1),
        filter_health: (Math.random() * 30 + 50).toFixed(1),
        timestamp: new Date().toISOString(),
        location: baseDevice.location || "Home",
        subscription_days_left: baseDevice.subscription_days_left || 30,
        model: baseDevice.model,
        status: baseDevice.status,
        filter_type: baseDevice.filter_type,
      })
    }
    return devices
  }

  const fetchWaterData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        "https://4syn5nk54tte73kytzwccfh64i0jpshy.lambda-url.eu-north-1.on.aws/",
      )
      const data = await response.json()
      const allDevices = generateDevices(data)
      // setDevicesData(allDevices) // This line is no longer needed as we use rentedPurifiers directly

      // Generate historical data for the first device or selected device
      const deviceToUse = selectedDevice || allDevices[0]?.device_id || "220"
      const deviceData = allDevices.find((d: Purifier) => d.device_id === deviceToUse) || allDevices[0]
      
      if (deviceData) {
        const historical = Array.from({ length: 24 }, (_, i) => ({
          time: `${23 - i}:00`,
          ph: (Number.parseFloat(deviceData.ph) + (Math.random() - 0.5) * 0.5).toFixed(2),
          tds: Math.floor(Number.parseInt(deviceData.tds) + (Math.random() - 0.5) * 50),
          temperature: (Number.parseFloat(deviceData.temprature) + (Math.random() - 0.5) * 3).toFixed(1),
          flow: (Number.parseFloat(deviceData.flow) + (Math.random() - 0.5) * 1).toFixed(2),
        }))
        setHistoricalData(historical)
      }
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
  }, [selectedDevice])

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

  const selectedDeviceData = selectedDevice 
    ? rentedPurifiers.find((d: Purifier) => d.device_id === selectedDevice) 
    : rentedPurifiers[0]
  
  const phValue = Number.parseFloat(selectedDeviceData?.ph || "0")
  const tdsValue = Number.parseInt(selectedDeviceData?.tds || "0")
  const temperatureValue = Number.parseFloat(selectedDeviceData?.temprature || "0")
  const filterHealthValue = Number.parseFloat(selectedDeviceData?.filter_health || "0")
  const flowValue = Number.parseFloat(selectedDeviceData?.flow || "0")

  const FILTER_TYPES = [
    { type: "UV", price: 500, color: "bg-blue-100", desc: "Kills bacteria & viruses. For clean tap water." },
    { type: "UF", price: 600, color: "bg-blue-300", desc: "Removes particles & cysts. Good for municipal water." },
    { type: "RO", price: 800, color: "bg-blue-700 text-white", desc: "Removes TDS, metals, bacteria. Ideal for borewell water." },
  ]

  function handleBook() {
    if (!isUser(user)) return
    setBooking(true)
    const newPurifier: Purifier = {
      device_id: `PG-${Math.floor(Math.random()*900+100)}`,
      model: newType as PurifierModel,
      status: "Running",
      subscription_days_left: 30,
      ph: "7.0",
      tds: "180",
      temprature: "28.0",
      filter_health: "100",
      flow: "2.5",
      filter_type: newType,
      location: newLocation,
      timestamp: new Date().toISOString(),
    }
    // Add rental request to shared store
    addRequest({
      userName: user.username || "User",
      userEmail: "user@demo.com",
      userPhone: "N/A",
      model: newType,
      location: newLocation,
    })
    const updatedUser = {
      ...user,
      rented_purifiers: [newPurifier, ...user.rented_purifiers],
    }
    authLogin(updatedUser, "User")
    setTimeout(() => {
      setBooking(false)
      setRentOpen(false)
      setNewLocation("")
      setNewType("UV")
    }, 800)
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
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Droplets className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-blue-900">PurityGrid</h1>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-700">Device:</span>
                <Select value={selectedDevice || "220"} onValueChange={setSelectedDevice}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rentedPurifiers.map((device: Purifier) => (
                      <SelectItem key={device.device_id} value={device.device_id}>
                        Device {device.device_id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/user/charts">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </Link>
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
        <Dialog open={rentOpen} onOpenChange={setRentOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" onClick={() => setRentOpen(true)}>
              + Rent More Purifier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rent a New Purifier</DialogTitle>
              <DialogDescription>Choose filter type and location. See comparison below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-blue-700 font-medium mb-1">Filter Type</label>
                <select value={newType} onChange={e => setNewType(e.target.value as PurifierModel)} className="w-full border-blue-200 rounded-md p-2">
                  {FILTER_TYPES.map(f => <option key={f.type} value={f.type}>{f.type}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">Location</label>
                <input value={newLocation} onChange={e => setNewLocation(e.target.value)} className="w-full border-blue-200 rounded-md p-2" placeholder="e.g. Kitchen, Office" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                {FILTER_TYPES.map(f => (
                  <div key={f.type} className={`rounded-lg p-4 ${f.color} shadow text-center`}>
                    <div className="font-bold text-lg mb-1">{f.type}</div>
                    <div className="text-blue-900 font-semibold mb-1">₹{f.price}/month</div>
                    <div className="text-xs text-blue-700">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleBook} disabled={booking || !newLocation} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-4">
                {booking ? "Booking..." : "Book"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Device Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Your Water Purifiers</h2>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-700">
                {rentedPurifiers.length} Devices Active
              </Badge>
              <Button onClick={fetchWaterData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {rentedPurifiers.slice(0, 12).map((device: Purifier) => {
              const isSelected = selectedDevice === device.device_id
              const phValue = Number.parseFloat(device.ph)
              const tdsValue = Number.parseInt(device.tds)
              const filterHealth = Number.parseFloat(device.filter_health)
              const temperature = Number.parseFloat(device.temprature)
              const flow = Number.parseFloat(device.flow)
              const subscriptionDays = device.subscription_days_left

              // Alerts
              const alerts: string[] = []
              if (filterHealth < 5) alerts.push("Filter Problem")
              if (tdsValue > 250) alerts.push("High TDS")
              if (phValue < 6.5 || phValue > 8.5) alerts.push("pH Out of Range")
              if (subscriptionDays < 7) alerts.push("Subscription Reminder")
              
              return (
                <Card 
                  key={device.device_id}
                  className={`border-white/30 bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                    isSelected ? 'ring-2 ring-blue-500 shadow-blue-500/20' : ''
                  }`}
                  onClick={() => setSelectedDevice(device.device_id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Device {device.device_id}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-4 w-4 text-green-500" />
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Online
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-blue-600">
                      {device.filter_type} Filter • Last updated: {new Date(device.timestamp).toLocaleTimeString()}
                    </CardDescription>
                    {/* Alerts */}
                    {alerts.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {alerts.map((alert, idx) => (
                          <Badge
                            key={idx}
                            className={
                              alert === "Filter Problem"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : alert === "High TDS"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : alert === "pH Out of Range"
                                ? "bg-orange-100 text-orange-800 border-orange-200"
                                : alert === "Subscription Reminder"
                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                            }
                          >
                            {alert}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{phValue.toFixed(1)}</div>
                        <div className="text-xs text-blue-600">pH Level</div>
                        <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${getStatusColor(phValue, "ph")}`}></div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{tdsValue}</div>
                        <div className="text-xs text-blue-600">TDS (ppm)</div>
                        <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${getStatusColor(tdsValue, "tds")}`}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600">Filter Health</span>
                        <span className="font-semibold text-blue-900">{filterHealth.toFixed(1)}%</span>
                      </div>
                      <Progress value={filterHealth} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-900">{temperature.toFixed(1)}°C</div>
                        <div className="text-xs text-blue-600">Temperature</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-900">{flow.toFixed(1)} L/min</div>
                        <div className="text-xs text-blue-600">Flow Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center mb-8">
            <p className="text-blue-600 text-sm">
              Showing 12 of {rentedPurifiers.length} devices. Use the device selector in the header to view specific devices.
            </p>
          </div>
        </div>

        {/* Selected Device Status */}
        {selectedDeviceData && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-900">Device {selectedDeviceData.device_id} Details</h2>
              <div className="flex items-center space-x-4">
                <Badge
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none shadow-lg"
                >
                  Device {selectedDeviceData.device_id} - Online
                </Badge>
                <Badge
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none shadow-lg"
                >
                  {selectedDeviceData.filter_type} Filter
                </Badge>
              </div>
            </div>
          </div>
        )}

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
