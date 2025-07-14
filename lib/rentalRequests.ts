// Rental Requests Store (with localStorage persistence)
export type RentalRequestStatus = "pending" | "accepted" | "rejected"
export interface RentalRequest {
  id: string
  userName: string
  userEmail: string
  userPhone: string
  model: string
  location: string
  status: RentalRequestStatus
  date: string
  extra?: string
}

const STORAGE_KEY = "rentalRequests"

function loadRequests(): RentalRequest[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveRequests(requests: RentalRequest[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
}

export function getRequests(): RentalRequest[] {
  return loadRequests()
}

export function addRequest(req: Omit<RentalRequest, "id" | "status" | "date">) {
  const requests = loadRequests()
  const newReq: RentalRequest = {
    ...req,
    id: `REQ-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    status: "pending",
    date: new Date().toISOString(),
  }
  requests.unshift(newReq)
  saveRequests(requests)
  return newReq
}

export function updateRequestStatus(id: string, status: RentalRequestStatus) {
  const requests = loadRequests().map(r => r.id === id ? { ...r, status } : r)
  saveRequests(requests)
} 