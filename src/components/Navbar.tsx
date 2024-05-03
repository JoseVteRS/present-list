import Link from 'next/link'
import React from 'react'
import LogoIcon from './LogoIcon'
import { Button } from './ui/button'
import { auth, signOut } from '@/auth'
import { SessionUsername } from './session/username'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuGroup } from '@/components/ui/dropdown-menu'
import { LayoutDashboardIcon, LogOut, Settings } from 'lucide-react'
import DashboardLayout from '@/src/app/(dashboard)/dashboard/layout'
import { LogoutButton } from './LogoutButton'
import { UserButton } from './auth/UserButton'



export const Navbar = async () => {
    const user = await auth()
    return (
        <div className='bg-gray-100 py-2 px-4 shadow'>
            <nav className='flex items-center justify-between'>
                <div className=''>
                    <Link href="/" className='text-center'>
                        <LogoIcon className='w-8 h-8' />
                        <span className='font-bold'>Lista</span>
                    </Link>
                </div>
                {
                    !user && (
                        <div className='gap-4 flex items-center'>
                            <Button asChild variant="primary">
                                <Link href="/auth/register" className='text-sm'>Registro</Link>
                            </Button>
                            <Link href="/auth/login" className='text-sm'>Iniciar sesión</Link>
                        </div>
                    )
                }
                {
                    user && (<UserButton />)
                }

            </nav>
        </div>
    )
}

