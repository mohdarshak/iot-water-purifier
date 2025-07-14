// Mock data for Purity Grid platform

export type PurifierStatus = "Running" | "Maintenance" | "Available"
export type PurifierModel = "UV" | "UF" | "RO"

export interface Purifier {
  device_id: string
  model: PurifierModel
  status: PurifierStatus
  location: string
  subscription_days_left: number // Only for rented
  ph: string
  tds: string
  temprature: string
  filter_health: string
  flow: string
  filter_type: string
  timestamp: string
}

export interface User {
  username: string
  password: string
  type: "User"
  rented_purifiers: Purifier[]
}

export interface Owner {
  username: string
  password: string
  type: "Business"
  supplied_purifiers: Purifier[]
}

const now = new Date().toISOString()

export const users: User[] = [
  {
    username: "user_big",
    password: "userbig123",
    type: "User",
    rented_purifiers: [
      { device_id: "PG-001", model: "RO", status: "Running", location: "Kitchen", subscription_days_left: 25, ph: "7.2", tds: "180", temprature: "28.5", filter_health: "80", flow: "2.5", filter_type: "RO", timestamp: now },
      { device_id: "PG-002", model: "UF", status: "Maintenance", location: "Office", subscription_days_left: 7, ph: "6.8", tds: "220", temprature: "30.1", filter_health: "10", flow: "1.2", filter_type: "UF", timestamp: now },
      // ...add more for a total of 60, with a mix of statuses and mock values, all fields required
    ],
  },
  {
    username: "user_anna",
    password: "useranna123",
    type: "User",
    rented_purifiers: [
      { device_id: "PG-201", model: "UV", status: "Running", location: "Home", subscription_days_left: 5, ph: "7.0", tds: "150", temprature: "27.0", filter_health: "60", flow: "2.0", filter_type: "UV", timestamp: now },
      { device_id: "PG-202", model: "RO", status: "Maintenance", location: "Office", subscription_days_left: 30, ph: "6.5", tds: "260", temprature: "29.5", filter_health: "5", flow: "1.0", filter_type: "RO", timestamp: now },
      { device_id: "PG-203", model: "UF", status: "Running", location: "Kitchen", subscription_days_left: 10, ph: "7.4", tds: "170", temprature: "26.8", filter_health: "90", flow: "2.8", filter_type: "UF", timestamp: now },
    ],
  },
  {
    username: "user_john",
    password: "userjohn123",
    type: "User",
    rented_purifiers: [
      { device_id: "PG-301", model: "RO", status: "Running", location: "Home", subscription_days_left: 15, ph: "7.1", tds: "200", temprature: "28.0", filter_health: "70", flow: "2.2", filter_type: "RO", timestamp: now },
    ],
  },
]

export const owners: Owner[] = [
  {
    username: "owner_mega",
    password: "ownmega123",
    type: "Business",
    supplied_purifiers: [
      { device_id: "PG-401", model: "UV", status: "Available", location: "Warehouse", subscription_days_left: 0, ph: "7.0", tds: "160", temprature: "27.5", filter_health: "100", flow: "2.6", filter_type: "UV", timestamp: now },
      { device_id: "PG-402", model: "RO", status: "Running", location: "Office", subscription_days_left: 0, ph: "7.3", tds: "190", temprature: "28.2", filter_health: "85", flow: "2.4", filter_type: "RO", timestamp: now },
      { device_id: "PG-403", model: "UF", status: "Maintenance", location: "Home", subscription_days_left: 0, ph: "6.7", tds: "210", temprature: "29.0", filter_health: "15", flow: "1.1", filter_type: "UF", timestamp: now },
      // ...add more for a total of 100, with a mix of statuses and mock values, all fields required
    ],
  },
  {
    username: "owner_sam",
    password: "ownersam123",
    type: "Business",
    supplied_purifiers: [
      { device_id: "PG-501", model: "RO", status: "Running", location: "Warehouse", subscription_days_left: 0, ph: "7.2", tds: "180", temprature: "28.5", filter_health: "80", flow: "2.5", filter_type: "RO", timestamp: now },
      { device_id: "PG-502", model: "UF", status: "Running", location: "Office", subscription_days_left: 0, ph: "7.1", tds: "170", temprature: "27.8", filter_health: "90", flow: "2.7", filter_type: "UF", timestamp: now },
      { device_id: "PG-503", model: "RO", status: "Available", location: "Warehouse", subscription_days_left: 0, ph: "7.0", tds: "160", temprature: "27.5", filter_health: "100", flow: "2.6", filter_type: "RO", timestamp: now },
      { device_id: "PG-504", model: "UV", status: "Maintenance", location: "Home", subscription_days_left: 0, ph: "6.8", tds: "230", temprature: "30.0", filter_health: "10", flow: "1.0", filter_type: "UV", timestamp: now },
      { device_id: "PG-505", model: "RO", status: "Running", location: "Office", subscription_days_left: 0, ph: "7.4", tds: "175", temprature: "28.1", filter_health: "95", flow: "2.9", filter_type: "RO", timestamp: now },
    ],
  },
  {
    username: "owner_nina",
    password: "ownnina123",
    type: "Business",
    supplied_purifiers: [
      { device_id: "PG-601", model: "RO", status: "Running", location: "Warehouse", subscription_days_left: 0, ph: "7.3", tds: "185", temprature: "28.3", filter_health: "88", flow: "2.3", filter_type: "RO", timestamp: now },
      { device_id: "PG-602", model: "RO", status: "Available", location: "Warehouse", subscription_days_left: 0, ph: "7.0", tds: "160", temprature: "27.5", filter_health: "100", flow: "2.6", filter_type: "RO", timestamp: now },
      { device_id: "PG-603", model: "UF", status: "Maintenance", location: "Home", subscription_days_left: 0, ph: "6.6", tds: "220", temprature: "29.2", filter_health: "12", flow: "1.2", filter_type: "UF", timestamp: now },
      // ...add more for a total of 15, all fields required
    ],
  },
] 