import Link from "next/link"
import { LayoutDashboardIcon, LogOut, Settings, User } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSub
} from '@/components/ui/dropdown-menu'
import Avatar from 'boring-avatars'

import { LogoutButton } from '@/components/LogoutButton'
import { auth } from "@/auth"
import { buttonVariants } from "../ui/button"

export const UserButton = async () => {
    const session = await auth()

    if (session?.user)
        return (
            <DropdownMenu>
                <DropdownMenuTrigger
                    name={session?.user.name ?? "User Menu"}
                    className={buttonVariants({
                        variant: "ghost",
                        size: "icon",
                    })}
                >
                    {session.user.name && (
                        <Avatar size={22} name={session.user.name} variant="beam" />
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href={`/dashboard/`} className='flex'>
                                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                                <span>Escritorio</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/dashboard/settings`} className='flex'>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Ajustes</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <LogoutButton />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
}
