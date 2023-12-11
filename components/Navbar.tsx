import Link from 'next/link'
import React from 'react'

const links = [
    { label: "Registro", href: '/register' },
    { label: "Iniciar sesión", href: '/login' },
]

export const Navbar = () => {
    return (
        <div className='bg-gray-100 p-4 shadow'>
            <nav className='flex items-center container mx-auto'>
                <div className='flex-1'>
                <Link href="/">LOGO</Link>
                </div>
                <ul className='flex items-center justify-end gap-5'>
                    {
                        links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))
                    }

                </ul>
            </nav>
        </div>
    )
}
