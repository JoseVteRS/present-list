'use client'

import useItemStore from "@/store/list";
import { Item, List, User } from "@prisma/client";
import Link from "next/link";
import { useStore } from "zustand";


interface TableItemsProps {
    items: Item[];
}


const TableItems = ({ items }: TableItemsProps) => {

    const store = useStore(useItemStore)

    const newItems = [...items, ...store.items]

    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-200 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descripcion
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Enlace
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        newItems.map((item, i) => (
                            <tr key={i} className="text-neutral-800 border">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-neutral-800">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4">
                                    <Link className="link" href={item.link} target="_blank" rel="noopener noreferrer" >Visitar</Link>
                                </td>
                                <td>
                                    Editar Borrar
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="flex justify-end">
                <button className="btn mt-5" >Guardar lista y generar link</button>
            </div>
        </>
    )
}

export default TableItems