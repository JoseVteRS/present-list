"use client"
import { Table, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Item } from '@prisma/client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import ExternalLink from '../ui/external-link'
import { presentPick } from '@/server/actions/present'
import { useState } from 'react'
import { WhatsappIcon } from '../icons/whatsapp-icon'
import CopyLinkDropdown from './copy-list-link-button'
import { ExternalLinkIcon, Gift, GiftIcon } from 'lucide-react'

interface Props {
  present: Item
}

export const PresentItem = ({ present }: Props) => {

  const [isFetching, setIsFetching] = useState(false)

  const handlePickPresent = async () => {
    try {
      setIsFetching(true)
      await presentPick(present.id)
    } catch (error) {
      setIsFetching(false)
    } finally {
      setIsFetching(false)
    }
  }


  return (
    <TableRow className={`h-[100px]' ${present.isPicked ? 'opacity-50 line-through pointer-events-none select-none' : ''}`}>
      <TableCell>{present.name}</TableCell>
      <TableCell className='max-w-[250px]'>
        {present.description}
      </TableCell>
      <TableCell>
        <div className="flex justify-end">
          {
            present.link && <Button variant="ghost" size="icon">
              <a href={present.link} title="Enlace externo al artículo">
                <ExternalLinkIcon />
              </a>
            </Button>
          }

          <Button variant="ghost" size="icon" onClick={handlePickPresent}>
            {!isFetching ? <GiftIcon className='duration-700 animate-in fade-in-5 slide-in-from-top-2' /> : "..."}
          </Button>
        </div>
      </TableCell>

    </TableRow>
  )
}
