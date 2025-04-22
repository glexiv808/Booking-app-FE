import type { SportType } from "@/types/sport-type"

// API base URL - replace with your Laravel API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000/api"

// Define possible response types
interface ApiResponse {
  data?: SportType[] | SportType
  sportTypes?: SportType[]
  [key: string]: any // Allow for other properties
}

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    const errorMessage = errorData?.message || `Error: ${response.status} ${response.statusText}`
    throw new Error(errorMessage)
  }

  const responseData: ApiResponse = await response.json()

  // Log the response for debugging
  console.log("API response data:", responseData)

  // Handle different response formats
  if (Array.isArray(responseData)) {
    // If the response is already an array, return it
    return responseData as SportType[]
  } else if (responseData.data && Array.isArray(responseData.data)) {
    // If response has a data property that's an array
    return responseData.data as SportType[]
  } else if (responseData.sportTypes && Array.isArray(responseData.sportTypes)) {
    // If response has a sportTypes property that's an array
    return responseData.sportTypes as SportType[]
  } else if (responseData.data && !Array.isArray(responseData.data)) {
    // If response has a data property that's a single object
    return responseData.data as SportType
  } else {
    // If none of the above, return the response as is
    return responseData as any
  }
}

// Fetch all sport types
export async function fetchSportTypes(): Promise<SportType[]> {
  const response = await fetch(`${API_BASE_URL}/sportTypes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  const result = await handleResponse(response)
  // Ensure we always return an array
  return Array.isArray(result) ? result : [result].filter(Boolean)
}

// Fetch a single sport type by ID
export async function fetchSportType(id: number): Promise<SportType> {
  const response = await fetch(`${API_BASE_URL}/sportTypes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  return handleResponse(response)
}

// Create a new sport type
export async function createSportType(data: { name: string; description?: string }): Promise<SportType> {
  const response = await fetch(`${API_BASE_URL}/sportTypes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })

  return handleResponse(response)
}

// Update an existing sport type
export async function updateSportType(id: number, data: { name: string; description?: string }): Promise<SportType> {
  const response = await fetch(`${API_BASE_URL}/sportTypes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })

  return handleResponse(response)
}

// Delete a sport type
export async function deleteSportType(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/sportTypes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  return handleResponse(response)
}
