import { CreateLink } from "@/components/CreateLink"
import { PickItemBottom } from "@/components/PickItemBottom"
import { Item } from "@prisma/client"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


interface ListItemPageProps {
    params: { userId: string }
}


export default async function ListItemPage({ params }: ListItemPageProps) {

    const list = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list/${params.userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache"
    })
    if (!list.ok) return
    const items = await list.json()

    const user = await prisma.user.findUnique({
        where: {
            id: params.userId
        },
        select: {
            name: true
        }
    })


    if (!items) return
    return (
        <div className="container mx-auto">
            <h1 className="text-xl  my-5">
                Lista de regalos de <span className="font-bold">{user && user.name}</span>
            </h1>
            <Table>
                <TableCaption>Lista de regalos de {user && user.name}</TableCaption>
                <TableHeader className="text-xs text-gray-200 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                    <TableRow >
                        <TableHead scope="col" className="px-6 py-3">Nombre</TableHead>
                        <TableHead scope="col" className="px-6 py-3">Descripción</TableHead>
                        <TableHead scope="col" className="px-6 py-3"></TableHead>
                        <TableHead scope="col" className="px-6 py-3"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        items.map((item: Item) => (
                            <TableRow key={item.id} className={`text-neutral-800 border ${item.isPicked && "opacity-30 pointer-events-none"}`}>
                                <TableCell className="border" >
                                    {item.name}
                                </TableCell>
                                <TableCell className="border w-[800px]">
                                    <p className=" w-full">{item.description}</p>
                                </TableCell>
                                <TableCell className="border">
                                    <Link href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        Visitar
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block ml-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-2 0V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v4h4m6 0h2m-2-4v4" />
                                        </svg>
                                    </Link>
                                </TableCell>
                                <TableCell className="border">
                                    {item.isPicked
                                        ? 'No disponible'
                                        : <PickItemBottom id={item.id} userId={params.userId} />
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>
    );
}