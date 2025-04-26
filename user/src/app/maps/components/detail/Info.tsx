import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Clock, MapPin, Phone } from "lucide-react";
import { useMapStore } from "@/stores/useMapStore";
import { useGetVenueDetail } from "@/queries/useVenue";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const InfoDetailVenue = () => {
  const [detailVenue, setDetailVenue] = useState<Venue>();
  const { venueIdSelected } = useMapStore();

  const { data, isLoading } = useGetVenueDetail(venueIdSelected ?? "");

  useEffect(() => {
    if (data?.payload.data) {
      setDetailVenue(data?.payload.data);
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center px-4 py-2">
        <MapPin className="h-6 w-6 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
        {isLoading ? (
          <Skeleton className="h-6 w-[250px]" />
        ) : (
          <p>{detailVenue?.venue_address}</p>
        )}
      </div>
      <Separator className="my-2" />
      <div className="flex items-center px-4 py-2">
        <Clock className="h-6 w-6 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
        {isLoading ? (
          <Skeleton className="h-6 w-[350px]" />
        ) : (
          <p>
            Giờ hoạt động: {detailVenue?.opening} - {detailVenue?.closing}
          </p>
        )}
      </div>
      <Separator className="my-2" />
      <div className="flex items-center px-4 py-2">
        <Phone className="h-6 w-6 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
        {isLoading ? (
          <Skeleton className="h-6 w-[300px]" />
        ) : (
          <p>{detailVenue?.phone_number}</p>
        )}
      </div>
    </>
  );
};
