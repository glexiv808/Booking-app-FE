'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { ArrowLeft, Edit, MapPin, Users, Phone, Calendar, Clock } from 'lucide-react';
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Venue } from '@/types/venue';


export default function VenueDetail() {
    const params = useParams();
    const venueId = params?.venue_id;

    const [venue, setVenue] = useState<Venue | null>(null);

    useEffect(() => {
        if (!venueId) return;

        axios.get(`http://localhost:8000/api/venues/detail/${venueId}`)
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
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/venue">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">{venue.venue_name}</h1>
                </div>
                <Link href={`/venue/${venue.venue_id}/update`}>
                    <Button>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                    <Card>
                        <div className="aspect-video w-full overflow-hidden">
                            {/* <img src={venue.imageUrl || "/placeholder.svg"} alt={venue.venue_name} className="h-full w-full object-cover" /> */}
                        </div>
                        <CardHeader>
                            <CardTitle>{venue.venue_name}</CardTitle>
                            <CardDescription className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {venue.venue_address}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            <div>
                                <h3 className="mb-2 font-medium">Thông tin cơ bản</h3>
                                <div className="grid gap-2 sm:grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>Giờ hoạt động: {venue.opening} - {venue.closing}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <div className="text-sm font-medium">Số điện thoại</div>
                                <div className="text-sm text-muted-foreground">{venue.phone_number}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                                <Calendar className="mr-2 h-4 w-4" />
                                Trạng thái {venue.venue_status}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}
