'use client'
import { VenueForm } from "@/components/venue-form"
import { Venue } from "@/types/venue";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";


// function getVenue(id: string) {
//   return {
//     id,
//     name: "Trung Tâm Hội Nghị Quốc Gia",
//     address: "Đại lộ Thăng Long, Mễ Trì, Nam Từ Liêm, Hà Nội",
//     description:
//       "Trung tâm Hội nghị Quốc gia là một trong những công trình kiến trúc hiện đại và đẹp nhất Việt Nam, được xây dựng với mục đích phục vụ các sự kiện lớn trong nước và quốc tế.",
//     capacity: 3800,
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0123456789",
//     contactEmail: "contact@trungtamhoinghi.vn",
//   }
// }

export default function EditVenuePage() {
  const params = useParams();
  const venueId = params?.venue_id;

  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(() => {
      if (!venueId) return;

      axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/venues/detail/${venueId}`)
          .then((res) => {
              console.log('Venue detail:', res.data);
              setVenue(res.data.data); // đúng key là `data`
          })
          .catch((err) => {
              console.error('Lỗi khi gọi API:', err);
          });
  }, [venueId]);

  if (!venue) return <div>Đang tải thông tin sân...</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Chỉnh Sửa Địa Điểm</h1>
      <VenueForm venue={venue} />
    </div>
  )
}
