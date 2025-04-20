"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type VenueFormProps = {
  venue?: {
    id: string
    name: string
    address: string
    description: string
    capacity: number
    contactName: string
    contactPhone: string
    contactEmail: string
    amenities: string[]
    imageUrl: string
  }
}

export function VenueForm({ venue }: VenueFormProps) {
  const router = useRouter()
  const isEditing = !!venue

  const [formData, setFormData] = useState({
    name: venue?.name || "",
    address: venue?.address || "",
    description: venue?.description || "",
    capacity: venue?.capacity || 0,
    contactName: venue?.contactName || "",
    contactPhone: venue?.contactPhone || "",
    contactEmail: venue?.contactEmail || "",
    amenities: venue?.amenities || ["Âm thanh", "Ánh sáng"],
    imageUrl: venue?.imageUrl || "/placeholder.svg?height=400&width=800",
  })

  const [newAmenity, setNewAmenity] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }))
      setNewAmenity("")
    }
  }

  const removeAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (isEditing && venue) {
        // In a real app, this would call the server action
        // await updateVenue(venue.id, formData)
        console.log("Updating venue:", venue.id, formData)
      } else {
        // In a real app, this would call the server action
        // await createVenue(formData)
        console.log("Creating venue:", formData)
      }

      // Navigate back to the venues list
      router.push("/")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <div className="flex items-center gap-2">
          <Link href={isEditing ? `/venues/${venue.id}` : "/"}>
            <Button type="button" variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-xl font-semibold">{isEditing ? "Chỉnh sửa thông tin địa điểm" : "Thêm địa điểm mới"}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên địa điểm</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Giờ hoạt động</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Người liên hệ</Label>
                  <Input id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Số điện thoại</Label>
                  <Input id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
                </div>

              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hình ảnh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-video max-h-[300px] overflow-hidden rounded-md border">
                <img
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="Venue preview"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL hình ảnh</Label>
                <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                <p className="text-xs text-muted-foreground">
                  Nhập URL hình ảnh hoặc để trống để sử dụng hình ảnh mặc định
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Link href={isEditing ? `/venues/${venue.id}` : "/"}>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : isEditing ? "Cập nhật" : "Tạo mới"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
