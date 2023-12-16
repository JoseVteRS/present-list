'use client'

import useItemStore from "@/store/list";
import { Item, List, User } from "@prisma/client";
import Link from "next/link";
import { useStore } from "zustand";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";


interface TableItemsProps {
    items: Item[];
}


const TableItems = ({ items }: TableItemsProps) => {

    const store = useStore(useItemStore)

    const newItems = [...items, ...store.items]

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
                                    {item.name}
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
                                <TableCell className="opacity-20 pointer-events-none">
                                    Editar Borrar
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