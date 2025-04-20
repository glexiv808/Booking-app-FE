'use client'
import { VenueForm } from "@/components/venue-form"

function getVenue(id: string) {
  return {
    id,
    name: "Trung Tâm Hội Nghị Quốc Gia",
    address: "Đại lộ Thăng Long, Mễ Trì, Nam Từ Liêm, Hà Nội",
    description:
      "Trung tâm Hội nghị Quốc gia là một trong những công trình kiến trúc hiện đại và đẹp nhất Việt Nam, được xây dựng với mục đích phục vụ các sự kiện lớn trong nước và quốc tế.",
    capacity: 3800,
    contactName: "Nguyễn Văn A",
    contactPhone: "0123456789",
    contactEmail: "contact@trungtamhoinghi.vn",
    amenities: ["Âm thanh", "Ánh sáng", "Máy chiếu", "Wi-Fi"],
    imageUrl: "/placeholder.svg?height=400&width=800",
  }
}

export default function EditVenuePage({ params }: { params: { id: string } }) {
  const venue = getVenue(params.id)

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Chỉnh Sửa Địa Điểm</h1>
      <VenueForm venue={venue} />
    </div>
  )
}
