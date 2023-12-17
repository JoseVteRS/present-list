'use client'

import useItemStore from "@/store/list";
import { Item, List, User } from "@prisma/client";
import Link from "next/link";
import { useStore } from "zustand";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { EditItemModal } from "./EditItemModal";
import { useIsMounted } from "@/lib/hooks/isMounted";


interface TableItemsProps {
    items: Item[];
}

function getCookiesFromClient() {
    if (typeof window == "undefined") return
    const userCookie = document.cookie.split('; ').find(row => row.startsWith('user'));
    const user = userCookie ? userCookie.split('=')[1] : null;

    if (!user) return
    return JSON.parse(user)
}

const TableItems = ({ items }: TableItemsProps) => {

    const store = useStore(useItemStore)
    const newItems = [...items, ...store.items]

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const mounted = useIsMounted()


    const handleDeleteItem = async (itemId: string) => {
        const user = getCookiesFromClient()


        try {
            const response = await fetch(`/api/item/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id }),
            })
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }

    }


    if (!mounted) return
    return (
        <div className="py-10 w-full">
            <Table>
                <TableCaption>Lista de regalos</TableCaption>
                <TableHeader className="bg-neutral-200 border">
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripcion</TableHead>
                        <TableHead>Enlace</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border">
                    {
                        newItems.map((item, i) => (
                            <TableRow key={item.id} className="text-neutral-800 border">
                                <TableCell className="border" >
                                    <span>{item.name}</span>
                                </TableCell>
                                <TableCell className="border">
                                    <p className=" w-[150px] truncate">{item.description}</p>
                                </TableCell>
                                
                                <TableCell className="border">
                                    <Link href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        Visitar
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block ml-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-2 0V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v4h4m6 0h2m-2-4v4" />
                                        </svg>
                                    </Link>
                                </TableCell>

                                <TableCell>
                                    {/* <EditItemModal item={item} /> */}
                                    <Button variant="ghost" className="text-red-500" onClick={() => handleDeleteItem(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24ZM100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Zm48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Z" /></svg>
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default TableItems