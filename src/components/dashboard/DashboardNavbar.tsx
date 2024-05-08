"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSelectedLayoutSegment } from "next/navigation"
import { Button } from "../ui/button"
import { MoveLeft } from "lucide-react"
import { cn } from "@/utils"

const SEGMENTS_URL = {
    LIST: "lista",
    PRESENT: "regalo"
}

const DASHBOARD_ROUTES = [
    {
        title: 'Lists',
        path: '/dashboard/lista',
    },
    {
        title: 'Regalos',
        path: '/dashboard/regalo',
    },
]

const DashboardNavbar = () => {

    const pathname = usePathname();
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
                <div className="flex items-center space-x-8">
                    {DASHBOARD_ROUTES.map((route) => (
                        <Link
                            key={route.path}
                            href={route.path}
                            className={cn(
                                "group relative px-1 pb-4 pt-3 text-sm font-medium outline-2 outline-sky-400 transition-colors duration-100 hover:bg-transparent hover:text-neutral-900 focus-visible:outline dark:hover:text-white",
                                pathname === route.path
                                    ? "border-b border-neutral-800 dark:border-white dark:text-white"
                                    : "text-neutral-500",
                            )}
                        >
                            <div className=" relative z-10 flex items-center space-x-2">
                                <span>{route.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    )
}

export default DashboardNavbar