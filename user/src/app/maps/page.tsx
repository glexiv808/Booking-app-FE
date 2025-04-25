"use client";

import type React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MapComponent from "@/app/maps/Map";
import Sidebar from "@/app/maps/SideBar";
import { useGetVenueForMap } from "@/queries/useVenue";
import { useMapStore } from "@/stores/useMapStore";
import NavBar from "@/app/maps/NavBar";
import { set } from "zod";

export default function MapPage() {
  const searchParams = useSearchParams();
  const {
    venuesForMap,
    setVenuesForMap,
    setCoordinateVenues,
    setVenueIdSelected,
    setFieldTypes,
    setSidebarOpen,
    setSearchFocused,
  } = useMapStore();
  const venueId = searchParams.get("id");

  const { data } = useGetVenueForMap();

  const fieldTypesData = [
    { id: 7, type: "pickleball", name: "Sân pickleball" },
    { id: 1, type: "badminton", name: "Sân cầu lông" },
    { id: 2, type: "football", name: "Sân bóng đá" },
    { id: 5, type: "tennis", name: "Sân tennis" },
    { id: 4, type: "volleyball", name: "Sân bóng chuyền" },
    { id: 3, type: "basketball", name: "Sân bóng rổ" },
    { id: 100, type: "multiple", name: "Sân phức hợp" },
    { id: 9, type: "golf", name: "Sân golf" },
  ];

  useEffect(() => {
    if (!venueId) {
      setSidebarOpen(false);
      setVenueIdSelected(null);
    }
  }, []);

  useEffect(() => {
    setFieldTypes(fieldTypesData);
    setVenuesForMap(data?.payload.data ?? []);
    setCoordinateVenues(data?.payload.data ?? []);
  }, [data]);

  useEffect(() => {
    if (venuesForMap) {
      const venue = venuesForMap.find((f) => f.venue_id === venueId);
      if (venue) {
        setVenueIdSelected(venueId);
        setSidebarOpen(true);
        setSearchFocused(false);
      } else {
        setVenueIdSelected(null);
      }
    }
  }, [venueId, venuesForMap]);

  return (
    <div className="relative h-[calc(100vh-65px)] w-full overflow-hidden z-[1000]">
      <NavBar />
      <Sidebar />
      <MapComponent />
    </div>
  );
}
