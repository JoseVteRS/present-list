import React from 'react'
import { TypographyH1, TypographyP } from '../ui/typography'
import { auth } from '@/auth'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { HeroImage } from './image-hero'

export const Hero = async () => {
    const session = await auth()

    return (
        <section className="flex flex-col items-center px-6 pt-16 text-center md:pt-24 lg:pt-32">
            <div className='container mx-auto py-10 text-center'>
                <TypographyH1 className="duration-500 animate-in fade-in-5 slide-in-from-bottom-2">ListaRegalos</TypographyH1>
                <TypographyP className="duration-700 animate-in fade-in-5 slide-in-from-top-2 md:text-base [&:not(:first-child)]:mt-6">
                    Crea listas de regalos y compartelas con tus familiares y amigos
                </TypographyP>
            </div>

            {
                !session
                && <>
                    <TypographyP>Regístrate y empieza a crear tu primera lista de regalos.</TypographyP>
                    <div className='flex items-center gap-5' >
                        <Button variant="secondary" className='mt-5'>
                            <Link href="/auth/register">Regístrate</Link>
                        </Button>
                        <Button variant="secondary" className='mt-5'>
                            <Link href="/auth/register">Demo</Link>
                        </Button>
                    </div>
                </>
            }

            <HeroImage src="/img/image-hero-01.png" />
        </section>
    )
}