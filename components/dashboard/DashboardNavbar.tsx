"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelectedLayoutSegment } from "next/navigation"
import { Button } from "../ui/button"
import { MoveLeft } from "lucide-react"

const SEGMENTS_URL = {
    LIST: "lista",
    PRESENT: "regalo"
}

const DashboardNavbar = () => {

    const segment = useSelectedLayoutSegment()
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <div className="">
            <nav className="flex items-center justify-between">
                <Button size="sm" variant="link" asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Button variant="link" className="m-0 p-0" asChild onClick={handleBack}>
                    
                                <MoveLeft />
                         
                        </Button>
                    </Link>
                </Button>
                <ul className="flex gap-2">
                    <li className={`transition py-1 px-2 hover:bg-neutral-200 ${segment === SEGMENTS_URL.LIST ? "bg-neutral-200  rounded" : ""}`}>
                        <Link className="w-full block" href={`/dashboard/lista`}>Listas</Link>
                    </li>
                    <li className={`transition py-1 px-2 hover:bg-neutral-200  ${segment === SEGMENTS_URL.PRESENT ? "bg-neutral-200  rounded" : ""}`}>
                        <Link className="w-full block" href={`/dashboard/regalo`}>Regalos</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default DashboardNavbar