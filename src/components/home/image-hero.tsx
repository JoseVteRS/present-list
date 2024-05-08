"use client"

import Image from 'next/image'
import React from 'react'

export const HeroImage = ({ src }: { src: string }) => {
  return (
    <div className='rounded-xl bg-neutral-200'>
      <Image src={src} objectFit='cover' width={400} height={400} alt='Imagen Hero' />
    </div>
  )
}
