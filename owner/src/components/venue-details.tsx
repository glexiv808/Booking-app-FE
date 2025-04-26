"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Clock, Edit, MapPin, Phone, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteVenue, fetchVenueById} from "@/lib/api"
import type { Venue, } from "@/types/venue"
import { EditVenueForm } from "./edit-venue-form"
import { DeleteVenueDialog } from "./delete-venue-dialog"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export function VenueDetails({ venueId }: { venueId: string }) {
  const router = useRouter()
  const [venue, setVenue] = useState<Venue | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const loadVenue = async () => {
    setIsLoading(true)
    try {
      const data = await fetchVenueById(venueId)
      setVenue(data)
    } catch (error) {
      console.error("Failed to fetch venue:", error)
      toast({
        title: "Error",
        description: "Failed to load venue details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadVenue()
  }, [venueId])
  
  const handleVenueUpdate = (updatedVenue: Venue) => {
    setVenue(updatedVenue)
    setShowEditModal(false)
  }

  const handleVenueDelete = async () => {
    try {
      await deleteVenue(venueId)
      router.push("/venue")
      loadVenue()
    } catch (error) {
      console.error("Failed to delete venue:", error)
      throw error
    }
  }


  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse h-8 w-48 bg-muted rounded-md mb-4 mx-auto"></div>
          <div className="animate-pulse h-4 w-64 bg-muted rounded-md mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Venue Not Found</h2>
          <p className="text-muted-foreground">The requested venue could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{venue.name}</CardTitle>
                  {venue.status && (
                    <Badge
                      variant={
                        venue.status === "active" ? "default" : venue.status === "inactive" ? "destructive" : "outline"
                      }
                    >
                      {venue.status}
                    </Badge>
                  )}
                </div>
                {venue.address && (
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {venue.address}
                  </CardDescription>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="aspect-video max-h-[300px] overflow-hidden rounded-md border">
                  <img
                    // src={formData.imageUrl || "/placeholder.svg"}
                    alt="Venue preview"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  {/* <Label htmlFor="imageUrl">URL hình ảnh</Label>
                <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} /> */}
                  <p className="text-xs text-muted-foreground">
                    Nhập URL hình ảnh hoặc để trống để sử dụng hình ảnh mặc định
                  </p>
                </div>
              </div>
            </CardContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Banking Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="text-muted-foreground">Bank Name:</span>
                      <p className="font-medium">{venue.bank_name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Account Number:</span>
                      <p className="font-medium">{venue.bank_account_number}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span>
                  {venue.longitude} - {venue.latitude}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Venue Modal */}
      <EditVenueForm
        venue={venue}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleVenueUpdate}
      />

      {/* Delete Venue Dialog */}
      <DeleteVenueDialog
        venueName={venue.name}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onDelete={handleVenueDelete}
      />
    </div>
  )
}
