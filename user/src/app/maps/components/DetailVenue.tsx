import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Clock, Info, MapPin, Phone } from "lucide-react";
import { useMapStore } from "@/stores/useMapStore";
import { useGetVenueDetail } from "@/queries/useVenue";
import { InfoDetailVenue } from "@/app/maps/components/detail/Info";

export const DetailVenue = () => {
  const [detailVenue, setDetailVenue] = useState<Venue>();
  const { venueIdSelected } = useMapStore();

  const { data } = useGetVenueDetail(venueIdSelected ?? "");

  useEffect(() => {
    if (data?.payload.data) {
      setDetailVenue(data?.payload.data);
    }
  }, [data]);

  // Tạo URL chia sẻ cho sân được chọn
  const getShareableLink = () => {
    if (!detailVenue) return "";

    // Lấy URL cơ sở của trang hiện tại
    const baseUrl = window.location.origin;
    return `${baseUrl}/maps?id=${detailVenue.venue_id}`;
  };

  // Hàm chia sẻ link
  const shareField = () => {
    const link = getShareableLink();
    if (navigator.share) {
      navigator
        .share({
          title: detailVenue?.venue_name,
          text: `Xem thông tin về ${detailVenue?.venue_name}`,
          url: link,
        })
        .catch((err) => {
          console.error("Lỗi khi chia sẻ:", err);
        });
    } else {
      // Fallback nếu Web Share API không được hỗ trợ
      navigator.clipboard.writeText(link).then(() => {
        alert("Đã sao chép liên kết vào clipboard!");
      });
    }
  };

  return (
    <>
      {/* Header */}
      <div className="relative">
        <div className="h-48 w-full relative">
          <Image
            src={detailVenue?.image_cover || "/logo.png"}
            alt={detailVenue?.venue_name ?? "Venue Image"}
            fill
            className="object-cover"
          />
          <button
            // onClick={backToSearch}
            className="absolute top-4 left-4 bg-white rounded-full p-1 shadow-md"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h1 className="text-2xl font-bold">{detailVenue?.venue_name}</h1>
          <div className="flex items-center mt-1">
            {/* {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 mr-0.5",
                  i < Math.floor(selectedVenue.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))} */}
          </div>
        </div>

        <div className="absolute -bottom-12 left-4">
          <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden">
            <Image
              src={detailVenue?.thumbnail || "/default_avatar.png"}
              alt={detailVenue?.venue_name ?? "Venue Image"}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        </div>

        <div className="absolute right-4 bottom-[-50px] flex gap-2">
          <Button variant="outline" onClick={shareField} className="bg-white">
            Chia sẻ
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            Đặt lịch
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 px-4">
        <Tabs defaultValue="info">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="info">Thông tin</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            <TabsTrigger value="services">Dịch vụ</TabsTrigger>
            <TabsTrigger value="photos">Hình ảnh</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            {/* <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
              <p>{detailVenue?.venue_address}</p>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
              <p>
                Giờ hoạt động: {detailVenue?.opening} - {detailVenue?.closing}
              </p>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
              <p>{detailVenue?.phone_number}</p>
            </div> */}
            <InfoDetailVenue />
          </TabsContent>

          <TabsContent value="reviews">
            <div className="text-center py-8">
              <p className="text-gray-500">Chưa có đánh giá nào.</p>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="text-center py-8">
              <p className="text-gray-500">Chưa có thông tin dịch vụ.</p>
            </div>
          </TabsContent>

          {/* <TabsContent value="photos">
            <div className="grid grid-cols-2 gap-2">
              {selectedVenue.images.map(
                (image: string, index: number) => (
                  <div
                    key={index}
                    className="relative h-32 rounded overflow-hidden"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${selectedVenue.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )
              )}
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </>
  );
};
