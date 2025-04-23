"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createVenue } from "@/lib/api"
import type { Venue } from "@/types/venue"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddVenueFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AddVenueForm({ isOpen, onClose, onSuccess }: AddVenueFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<Omit<Venue, "venue_id">>({
    name: "",
    address: "",
    status: "active",
    bank_account_number: "",
    bank_name: "",
    phone_number: "",
    opening: "",
    closing: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Venue name is required"
    }

    if (!formData.bank_account_number.trim()) {
      newErrors.bank_account_number = "Bank account number is required"
    }

    if (!formData.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required"
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required"
    }

    if (!formData.opening.trim()) {
      newErrors.opening = "Opening time is required"
    }

    if (!formData.closing.trim()) {
      newErrors.closing = "Closing time is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const newVenue = await createVenue(formData)
      toast({
        title: "Success",
        description: "Venue created successfully",
      })

      if (onSuccess) {
        onSuccess()
      } else {
        router.push(`/venue?venueId=${newVenue.venue_id}`)
        onClose()
      }
    } catch (error) {
      console.error("Failed to create venue:", error)
      toast({
        title: "Error",
        description: "Failed to create venue. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Venue</DialogTitle>
            <DialogDescription>Fill in the details to create a new venue.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <div className="col-span-3">
                <Input id="address" name="address" value={formData.address || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.status || "active"}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bank_name" className="text-right">
                Bank Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="bank_name"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  className={errors.bank_name ? "border-destructive" : ""}
                />
                {errors.bank_name && <p className="text-sm text-destructive mt-1">{errors.bank_name}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bank_account_number" className="text-right">
                Bank Account
              </Label>
              <div className="col-span-3">
                <Input
                  id="bank_account_number"
                  name="bank_account_number"
                  value={formData.bank_account_number}
                  onChange={handleChange}
                  className={errors.bank_account_number ? "border-destructive" : ""}
                />
                {errors.bank_account_number && (
                  <p className="text-sm text-destructive mt-1">{errors.bank_account_number}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone_number" className="text-right">
                Phone Number
              </Label>
              <div className="col-span-3">
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={errors.phone_number ? "border-destructive" : ""}
                />
                {errors.phone_number && <p className="text-sm text-destructive mt-1">{errors.phone_number}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opening" className="text-right">
                Opening Time
              </Label>
              <div className="col-span-3">
                <Input
                  id="opening"
                  name="opening"
                  type="time"
                  value={formData.opening}
                  onChange={handleChange}
                  className={errors.opening ? "border-destructive" : ""}
                />
                {errors.opening && <p className="text-sm text-destructive mt-1">{errors.opening}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="closing" className="text-right">
                Closing Time
              </Label>
              <div className="col-span-3">
                <Input
                  id="closing"
                  name="closing"
                  type="time"
                  value={formData.closing}
                  onChange={handleChange}
                  className={errors.closing ? "border-destructive" : ""}
                />
                {errors.closing && <p className="text-sm text-destructive mt-1">{errors.closing}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Venue"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
