import Link from 'next/link'
import React from 'react'
import LogoIcon from './LogoIcon'



export const Navbar = () => {
    return (
        <div className='bg-gray-100 py-2 px-4 shadow'>
            <nav className='flex items-center justify-between'>
                <div className=''>
                    <Link href="/" className='text-center'>
                        <LogoIcon className='w-8 h-8' /> 
                        <span className='font-bold'>Lista</span>
                    </Link>
                </div>
                <div className='gap-4 flex items-center'>
                    <Link href="/register" className='text-sm'>Registro</Link>
                    <Link href="/login" className='text-sm'>Iniciar sesión</Link>
                </div>
            </nav>
        </div>
    )
}

