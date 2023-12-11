import { CreateLink } from "@/components/CreateLink"
import { PickItemBottom } from "@/components/PickItemBottom"
import { Item } from "@prisma/client"
import Link from "next/link"


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

    const user = await prisma?.user.findUnique({
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
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-200 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                    <tr >
                        <th scope="col" className="px-6 py-3">Nombre</th>
                        <th scope="col" className="px-6 py-3">Descripción</th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        items.map((item: Item) => (
                            <tr key={item.id} className={`text-neutral-800 border ${item.isPicked && "opacity-30 pointer-events-none"}`}>
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
                                    {item.isPicked
                                        ? 'No disponible'
                                        : <PickItemBottom id={item.id} userId={params.userId} />
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    );
}