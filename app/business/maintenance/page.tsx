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
} from "recharts"
import { Building2, ArrowLeft, Wrench, AlertTriangle, Clock, CheckCircle, Phone } from "lucide-react"
import Link from "next/link"

interface MaintenanceCall {
  id: string
  deviceId: string
  customerName: string
  location: string
  issue: string
  priority: "high" | "medium" | "low"
  status: "pending" | "in-progress" | "completed"
  dateRequested: string
  dateCompleted?: string
  technicianName?: string
  deviceType: "RO" | "UV" | "UF"
}

export default function MaintenancePage() {
  const [maintenanceCalls] = useState<MaintenanceCall[]>([
    {
      id: "M001",
      deviceId: "223",
      customerName: "Rajesh Kumar",
      location: "Main Kitchen",
      issue: "Filter replacement required",
      priority: "high",
      status: "pending",
      dateRequested: "2024-12-08",
      deviceType: "UF",
    },
    {
      id: "M002",
      deviceId: "224",
      customerName: "Priya Sharma",
      location: "Break Room",
      issue: "Low water flow",
      priority: "medium",
      status: "in-progress",
      dateRequested: "2024-12-07",
      technicianName: "Amit Singh",
      deviceType: "UF",
    },
    {
      id: "M003",
      deviceId: "225",
      customerName: "Suresh Patel",
      location: "Reception Area",
      issue: "UV lamp replacement",
      priority: "high",
      status: "completed",
      dateRequested: "2024-12-06",
      dateCompleted: "2024-12-07",
      technicianName: "Ravi Kumar",
      deviceType: "UV",
    },
    {
      id: "M004",
      deviceId: "226",
      customerName: "Anita Gupta",
      location: "Conference Room",
      issue: "Routine maintenance",
      priority: "low",
      status: "completed",
      dateRequested: "2024-12-05",
      dateCompleted: "2024-12-06",
      technicianName: "Vikash Yadav",
      deviceType: "RO",
    },
    {
      id: "M005",
      deviceId: "227",
      customerName: "Deepak Verma",
      location: "Cafeteria",
      issue: "Water quality issue",
      priority: "high",
      status: "completed",
      dateRequested: "2024-12-04",
      dateCompleted: "2024-12-05",
      technicianName: "Amit Singh",
      deviceType: "RO",
    },
    {
      id: "M006",
      deviceId: "228",
      customerName: "Meera Joshi",
      location: "Office Floor 2",
      issue: "Filter clogged",
      priority: "medium",
      status: "completed",
      dateRequested: "2024-12-03",
      dateCompleted: "2024-12-04",
      technicianName: "Ravi Kumar",
      deviceType: "UF",
    },
    {
      id: "M007",
      deviceId: "229",
      customerName: "Kiran Reddy",
      location: "Lab Area",
      issue: "Membrane replacement",
      priority: "high",
      status: "completed",
      dateRequested: "2024-12-02",
      dateCompleted: "2024-12-03",
      technicianName: "Vikash Yadav",
      deviceType: "RO",
    },
    {
      id: "M008",
      deviceId: "230",
      customerName: "Sanjay Agarwal",
      location: "Guest Area",
      issue: "Routine service",
      priority: "low",
      status: "completed",
      dateRequested: "2024-12-01",
      dateCompleted: "2024-12-02",
      technicianName: "Amit Singh",
      deviceType: "UV",
    },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "pending":
        return "Pending"
      default:
        return "Unknown"
    }
  }

  const totalCalls = maintenanceCalls.length
  const completedCalls = maintenanceCalls.filter((call) => call.status === "completed").length
  const pendingCalls = maintenanceCalls.filter((call) => call.status === "pending").length
  const inProgressCalls = maintenanceCalls.filter((call) => call.status === "in-progress").length

  const statusData = [
    { name: "Completed", value: completedCalls, color: "#10b981" },
    { name: "In Progress", value: inProgressCalls, color: "#3b82f6" },
    { name: "Pending", value: pendingCalls, color: "#f59e0b" },
  ]

  const priorityData = [
    { name: "High", value: maintenanceCalls.filter((call) => call.priority === "high").length, color: "#ef4444" },
    { name: "Medium", value: maintenanceCalls.filter((call) => call.priority === "medium").length, color: "#f59e0b" },
    { name: "Low", value: maintenanceCalls.filter((call) => call.priority === "low").length, color: "#10b981" },
  ]

  const deviceTypeData = [
    { name: "RO", value: maintenanceCalls.filter((call) => call.deviceType === "RO").length, color: "#3b82f6" },
    { name: "UF", value: maintenanceCalls.filter((call) => call.deviceType === "UF").length, color: "#10b981" },
    { name: "UV", value: maintenanceCalls.filter((call) => call.deviceType === "UV").length, color: "#f59e0b" },
  ]

  // Generate monthly data for the last 6 months
  const monthlyData = [
    { month: "Jul", calls: 12, completed: 11, avgTime: 1.2 },
    { month: "Aug", calls: 15, completed: 14, avgTime: 1.1 },
    { month: "Sep", calls: 18, completed: 17, avgTime: 1.3 },
    { month: "Oct", calls: 14, completed: 13, avgTime: 1.0 },
    { month: "Nov", calls: 16, completed: 15, avgTime: 1.2 },
    { month: "Dec", calls: 8, completed: 6, avgTime: 1.1 },
  ]

  const handleAssignTechnician = (callId: string) => {
    alert(`Assigning technician to maintenance call ${callId}`)
  }

  const handleCallCustomer = (customerName: string) => {
    alert(`Calling customer: ${customerName}`)
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
              <Building2 className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-900">PurityGrid - Maintenance Tracking</h1>
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
                Total Calls
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                <Wrench className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{totalCalls}</div>
              <p className="text-xs text-blue-600 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Completed
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{completedCalls}</div>
              <p className="text-xs text-green-600 mt-1">
                {((completedCalls / totalCalls) * 100).toFixed(1)}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Pending
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg shadow-lg">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">{pendingCalls}</div>
              <p className="text-xs text-yellow-600 mt-1">Awaiting assignment</p>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                High Priority
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-lg">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                {maintenanceCalls.filter((call) => call.priority === "high").length}
              </div>
              <p className="text-xs text-red-600 mt-1">Urgent attention needed</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Call Status Distribution</CardTitle>
              <CardDescription className="text-blue-600">Current maintenance call status</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  completed: { label: "Completed", color: "#10b981" },
                  inProgress: { label: "In Progress", color: "#3b82f6" },
                  pending: { label: "Pending", color: "#f59e0b" },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Priority Breakdown</CardTitle>
              <CardDescription className="text-blue-600">Maintenance calls by priority level</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  high: { label: "High", color: "#ef4444" },
                  medium: { label: "Medium", color: "#f59e0b" },
                  low: { label: "Low", color: "#10b981" },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priorityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-900">Device Type Calls</CardTitle>
              <CardDescription className="text-blue-600">Maintenance calls by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  ro: { label: "RO", color: "#3b82f6" },
                  uf: { label: "UF", color: "#10b981" },
                  uv: { label: "UV", color: "#f59e0b" },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deviceTypeData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
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

        {/* Monthly Trends */}
        <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-blue-900">Monthly Maintenance Trends</CardTitle>
            <CardDescription className="text-blue-600">
              Maintenance call volume and completion rates over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                calls: { label: "Total Calls", color: "#3b82f6" },
                completed: { label: "Completed", color: "#10b981" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Maintenance Calls List */}
        <Card className="border-white/30 bg-white/80 backdrop-blur-lg shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-900">Recent Maintenance Calls</CardTitle>
            <CardDescription className="text-blue-600">
              Complete list of maintenance requests and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-blue-900">{call.customerName}</span>
                        <Badge className={`${getPriorityColor(call.priority)} text-white border-none text-xs`}>
                          {call.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <span className="text-sm text-blue-600">
                        {call.location} - Device {call.deviceId}
                      </span>
                      <span className="text-sm text-blue-700 font-medium">{call.issue}</span>
                      <span className="text-xs text-blue-500">
                        Requested: {call.dateRequested}
                        {call.dateCompleted && ` | Completed: ${call.dateCompleted}`}
                      </span>
                      {call.technicianName && (
                        <span className="text-xs text-blue-600">Technician: {call.technicianName}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge
                        className={`${call.deviceType === "RO" ? "bg-blue-500" : call.deviceType === "UF" ? "bg-green-500" : "bg-yellow-500"} text-white border-none mb-2`}
                      >
                        {call.deviceType}
                      </Badge>
                      <div>
                        <Badge variant="outline" className={`${getStatusColor(call.status)} text-white border-none`}>
                          {getStatusText(call.status)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCallCustomer(call.customerName)}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      {call.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleAssignTechnician(call.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          Assign Tech
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
