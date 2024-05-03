import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const ListSkeleton = () => {
  return (
    <div className="border rounded-md p-3">
      <div className="flex justify-between items-center">
        <Skeleton className='h-3 w-60 rounded-sm' />
        <Skeleton className='h-3 w-10 rounded-sm' />
      </div>

      <Skeleton className='h-3 rounded-sm w-full mt-2' />

      <Skeleton className='h-3 rounded-sm w-full mt-2' />
      <Skeleton className='h-6 rounded-full w-12 mt-2' />
    </div>
  )
}
