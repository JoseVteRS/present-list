import Link from 'next/link'
import React from 'react'



export const Navbar = () => {
    return (
        <div className='bg-gray-100 p-4 shadow'>
            <nav className='flex items-center container mx-auto'>
                <div className='flex-1'>
                    <Link href="/">LOGO</Link>
                </div>
                <div className='gap-5 flex items-center'>
                    <Link href="/register">Registro</Link>
                    <Link href="/login">Iniciar sesión</Link>
                </div>
            </nav>
        </div>
    )
}

