'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import  AppSidebar  from "@/components/app-sidebar"
import type { Venue } from '@/types/venue';


export default function Venue() {
    const [venues, setVenues] = useState<Venue[]>([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/venues`)
            .then((res) => {
                console.log('API response:', res.data)
                setVenues(res.data.data ?? res.data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <>
        <SidebarProvider >
             <AppSidebar venues={venues} />
            <main>
                <SidebarTrigger />
                {/* {children} */}
            </main>
        </SidebarProvider>
        </>
    )
}
