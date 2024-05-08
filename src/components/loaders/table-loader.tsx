import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const TableLoader = () => {
  return (
    <>
      <Skeleton className='h-[50px] w-full mt-5' />
      <Skeleton className='h-[100px] w-full mt-1' />
      <Skeleton className='h-[100px] w-full mt-1' />
      <Skeleton className='h-[100px] w-full mt-1' />
    </>
  )
}
