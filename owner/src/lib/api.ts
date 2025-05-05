import type { Venue, VenueImg } from "@/types/venue"
import { getAccessTokenFormLocalStorage } from "./utils";
import { Booking, BookingStatsResponse } from "@/types/booking";

const token = getAccessTokenFormLocalStorage();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000/api"

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    // Try to get error message from the response
    try {
      const errorData = await response.json()
      throw new Error(errorData.message || `API error: ${response.status}`)
    } catch (e) {
      throw new Error(`API error: ${response.status}`)
    }
  }
  return response.json()
}



// Function to fetch all venues
export async function fetchVenues(): Promise<Venue[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/venues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${token}`
      },
    })

    const data = await handleResponse(response)

    return Array.isArray(data.data) ? data.data : data
  } catch (error) {
    console.error("Error fetching venues:", error)
    throw error
  }
}

// Function to fetch a single venue by ID
export async function fetchVenueById(id: string): Promise<Venue> {
  try {
    const response = await fetch(`${API_BASE_URL}/venues/search_by_id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    })

    const data = await handleResponse(response)

    // Return the venue data (adjust based on your API structure)
    return data.data || data
  } catch (error) {
    console.error(`Error fetching venue ${id}:`, error)
    throw error
  }
}

// Function to create a new venue
export async function createVenue(venueData: Omit<Venue, "venue_id">): Promise<Venue> {
  try {
    const response = await fetch(`${API_BASE_URL}/venues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(venueData),
    })

    const data = await handleResponse(response)

    // Return the created venue
    return data.data || data
  } catch (error) {
    console.error("Error creating venue:", error)
    throw error
  }
}

// Function to update a venue
export async function updateVenue(id: string, venueData: Partial<Venue>): Promise<Venue> {
  try {
    const response = await fetch(`${API_BASE_URL}/venues/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(venueData),
    })

    const data = await handleResponse(response)

    // Return the updated venue
    return data.data || data
  } catch (error) {
    console.error(`Error updating venue ${id}:`, error)
    throw error
  }
}

// Function to delete a venue
export async function deleteVenue(id: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_BASE_URL}/venues/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    await handleResponse(response)

    // Return success if no error was thrown
    return { success: true }
  } catch (error) {
    console.error(`Error deleting venue ${id}:`, error)
    throw error
  }
}

// Function to fetch all venues Image by id
export async function fetchVenueImgById(id: string): Promise<VenueImg[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/venue-images/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    // return res.json();
    const data = await handleResponse(res)
    return data.data || data
  } catch (error) {
    console.error(`Error fetching venue image ${id}:`, error)
    throw error
  }
}

// Function to add venues Image by id
export async function addVenueImgById(id: string, images: string[]): Promise<VenueImg[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/venue-images/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await handleResponse(res)
    return data.data || data
  } catch (error) {
    console.error(`Error add venue image ${id}:`, error)
    throw error
  }
}

// Function to delete venues Image by id
export async function deleteVenueImgById(id: string): Promise<VenueImg[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/venue-images/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await handleResponse(res)
    return data.data || data
  } catch (error) {
    console.error(`Error delete venue image ${id}:`, error)
    throw error
  }
}

// Function to update venues Image by id
export async function updateVenueImgById(id: string): Promise<VenueImg[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/venue-images/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await handleResponse(res)
    return data.data || data
  } catch (error) {
    console.error(`Error update venue image ${id}:`, error)
    throw error
  }
}

// Function to fetch all bookings
// export async function fetchBooking(): Promise<Booking[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/bookings`, {
//       method: "GET",
//       headers: {
//        "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`
//       },
//     })
//     const data = await handleResponse(response)
//     return Array.isArray(data.data) ? data.data : data
//   } catch (error) {
//     console.error("Error fetching bookings:", error)
//     return []
//   }
// }

// // Function to fetch a specific booking by ID
// export async function fetchBookingById(id: string): Promise<Booking | null> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       next: {
//         revalidate: 60,
//       },
//     })

//     const data = await handleResponse(response)
//     return data.data || data
//   } catch (error) {
//     console.error(`Error fetching booking with ID ${id}:`, error)
//     return null
//   }
// }

// // Function to update booking status
// export async function updateBookingStatus(id: string, status: string): Promise<boolean> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ status }),
//     })

//     await handleResponse(response)
//     return true
//   } catch (error) {
//     console.error(`Error updating booking status:`, error)
//     return false
//   }
// }

// // Function to fetch all courts
// export async function fetchCourts(): Promise<CourtInfo[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/courts`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       next: {
//         revalidate: 60,
//       },
//     })

//     const data = await handleResponse(response)
//     return Array.isArray(data.data) ? data.data : data
//   } catch (error) {
//     console.error("Error fetching courts:", error)
//     return []
//   }
// }

// // Function to create a new booking
// export async function createBooking(bookingData: Omit<Booking, "booking_id">): Promise<Booking | null> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/bookings`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(bookingData),
//     })

//     const data = await handleResponse(response)
//     return data.data || data
//   } catch (error) {
//     console.error("Error creating booking:", error)
//     return null
//   }
// }

// // Function to update a court
// export async function updateCourt(id: string, courtData: Partial<CourtInfo>): Promise<CourtInfo | null> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/courts/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(courtData),
//     })

//     const data = await handleResponse(response)
//     return data.data || data
//   } catch (error) {
//     console.error(`Error updating court:`, error)
//     return null
//   }
// }

// // Function to create a new court
// export async function createCourt(courtData: Omit<CourtInfo, "id">): Promise<CourtInfo | null> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/courts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(courtData),
//     })

//     const data = await handleResponse(response)
//     return data.data || data
//   } catch (error) {
//     console.error("Error creating court:", error)
//     return null
//   }
// }

// // Function to delete a court
// export async function deleteCourt(id: string): Promise<boolean> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/courts/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`
//       },
//     })

//     await handleResponse(response)
//     return true
//   } catch (error) {
//     console.error(`Error deleting court:`, error)
//     return false
//   }
// }

interface FetchBookingsParams {
  page?: number
  status?: string | null
  perPage?: number
  fieldId?: string
  startDate?: string
  endDate?: string
}

// Update the fetchBookings function to handle errors better and provide mock data when needed
export async function fetchBookings({
  page = 1,
  status = null,
  perPage = 10,
  fieldId,
  startDate,
  endDate,
}: FetchBookingsParams = {}): Promise<BookingStatsResponse> {
  try {
    // Build query parameters
    const params = new URLSearchParams()

    if (page) params.append("page", page.toString())
    if (perPage) params.append("per_page", perPage.toString())
    if (status) params.append("status", status)
    if (fieldId) params.append("field_id", fieldId)
    if (startDate) params.append("start_date", startDate)
    if (endDate) params.append("end_date", endDate)

    const queryString = params.toString() ? `?${params.toString()}` : ""
    const url = `${API_BASE_URL}/bookings${queryString}`

    console.log(`Fetching bookings from: ${url}`)

    // Add timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      // Add error handling for CORS issues
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)

      // If we're in development or preview mode, return mock data
      if (process.env.NODE_ENV !== "production" || window.location.hostname.includes("vercel")) {
        console.log("Returning mock data since API is unavailable")
        return getMockBookingData(page, status)
      }

      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data: BookingStatsResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching bookings:", error)

    // If we're in development or preview mode, return mock data
    if (process.env.NODE_ENV !== "production" || window.location.hostname.includes("vercel")) {
      console.log("Returning mock data due to error")
      return getMockBookingData(page, status)
    }

    throw new Error(
      error instanceof Error
        ? `API Error: ${error.message}`
        : "Failed to fetch bookings data. Please check if the API server is running.",
    )
  }
}

// Add a function to generate mock data for development and preview
function getMockBookingData(page = 1, statusFilter: string | null = null): BookingStatsResponse {
  const mockBookings = [
    {
      booking_id: "BK001",
      field_id: "F1",
      booking_date: "2023-05-15",
      total_price: "150000.00",
      customer_name: "John Doe",
      customer_phone: "123-456-7890",
      status: "completed",
      courts: [
        {
          court_id: "C1",
          start_time: "09:00:00",
          end_time: "11:00:00",
          price: "75000.00",
        },
      ],
    },
    {
      booking_id: "BK002",
      field_id: "F2",
      booking_date: "2023-05-16",
      total_price: "200000.00",
      customer_name: "Jane Smith",
      customer_phone: "987-654-3210",
      status: "pending",
      courts: [
        {
          court_id: "C2",
          start_time: "14:00:00",
          end_time: "16:00:00",
          price: "100000.00",
        },
        {
          court_id: "C3",
          start_time: "16:00:00",
          end_time: "18:00:00",
          price: "100000.00",
        },
      ],
    },
    {
      booking_id: "BK003",
      field_id: "F1",
      booking_date: "2023-05-17",
      total_price: "120000.00",
      customer_name: "Robert Johnson",
      customer_phone: "555-123-4567",
      status: "cancelled",
      courts: [
        {
          court_id: "C1",
          start_time: "18:00:00",
          end_time: "20:00:00",
          price: "120000.00",
        },
      ],
    },
    {
      booking_id: "BK004",
      field_id: "F3",
      booking_date: "2023-05-18",
      total_price: "180000.00",
      customer_name: "Emily Davis",
      customer_phone: "333-444-5555",
      status: "completed",
      courts: [
        {
          court_id: "C4",
          start_time: "10:00:00",
          end_time: "13:00:00",
          price: "180000.00",
        },
      ],
    },
    {
      booking_id: "BK005",
      field_id: "F2",
      booking_date: "2023-05-19",
      total_price: "250000.00",
      customer_name: "Michael Wilson",
      customer_phone: "777-888-9999",
      status: "pending",
      courts: [
        {
          court_id: "C2",
          start_time: "09:00:00",
          end_time: "12:00:00",
          price: "150000.00",
        },
        {
          court_id: "C3",
          start_time: "12:00:00",
          end_time: "14:00:00",
          price: "100000.00",
        },
      ],
    },
  ]

  // Filter by status if provided
  const filteredBookings = statusFilter
    ? mockBookings.filter((booking) => booking.status === statusFilter)
    : mockBookings

  // Simple pagination
  const perPage = 2
  const totalItems = filteredBookings.length
  const totalPages = Math.ceil(totalItems / perPage)
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * perPage
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + perPage)

  // Calculate total completed price
  const totalCompletedPrice = mockBookings
    .filter((booking) => booking.status === "completed")
    .reduce((sum, booking) => sum + Number.parseFloat(booking.total_price.replace(/,/g, "")), 0)
    .toString()

  return {
    status: 200,
    message: "Mock booking data retrieved successfully",
    data: {
      bookings: paginatedBookings,
      total_completed_price: totalCompletedPrice,
      pagination: {
        current_page: currentPage,
        last_page: totalPages,
        per_page: perPage,
        total: totalItems,
        next_page_url: currentPage < totalPages ? `?page=${currentPage + 1}` : null,
        prev_page_url: currentPage > 1 ? `?page=${currentPage - 1}` : null,
      },
    },
  }
}

/**
 * Fetches a single booking by ID
 */
export async function fetchBookingById(bookingId: string): Promise<BookingStatsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data: BookingStatsResponse = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching booking ${bookingId}:`, error)
    throw new Error(
      error instanceof Error
        ? error.message
        : `Failed to fetch booking ${bookingId}. Please check if the API server is running.`,
    )
  }
}

/**
 * Updates a booking's status
 */
export async function updateBookingStatus(
  bookingId: string,
  status: "pending" | "completed" | "cancelled",
): Promise<BookingStatsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data: BookingStatsResponse = await response.json()
    return data
  } catch (error) {
    console.error(`Error updating booking ${bookingId}:`, error)
    throw new Error(
      error instanceof Error
        ? error.message
        : `Failed to update booking ${bookingId}. Please check if the API server is running.`,
    )
  }
}

/**
 * Fetches booking statistics
 */
export async function fetchBookingStats(): Promise<BookingStatsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/stats`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data: BookingStatsResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching booking stats:", error)
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch booking statistics. Please check if the API server is running.",
    )
  }
}