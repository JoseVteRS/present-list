import React from 'react'
import Link from 'next/link'
import { GiftIcon } from 'lucide-react'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { UserButton } from '@/components/auth/UserButton'
import { Badge } from '@/components/ui/badge'
import { ChangeTheme } from './change-theme'


export const Navbar = async () => {
    const user = await auth()
    return (
        <div className='w-full dark:bg-neutral-900 py-2'>
            <nav className='container mx-auto flex items-center justify-between'>
                <div className=' flex items-center gap-2'>
                    <Link href="/" className='text-center'>
                        <GiftIcon className='dark:text-neutral-100 text-neutral-800' />
                    </Link>
                    <Badge className="cursor-pointer md:block" variant="outline">beta</Badge>
                </div>
                <div className='flex items-center gap-2'>
                    <ChangeTheme />
                    {
                        !user && (
                            <div className='gap-4 flex items-center'>
                                <Button asChild variant="secondary">
                                    <Link href="/auth/register" className='text-sm'>Registro</Link>
                                </Button>
                                <Link href="/auth/login" className='text-sm'>Iniciar sesión</Link>
                            </div>
                        )
                    }
                    {
                        user && (<UserButton />)
                    }
                </div>


            </nav>
        </div>
    )
}

