import { cookies } from "next/headers"
import prisma from "@/lib/prisma"
import CreateItemListForm from '@/components/CreateItemListForm'
import LoginForm from "@/components/LoginForm"
import TableItems from "@/components/TableItems"
import { CreateLink } from "@/components/CreateLink"

export default async function Home() {

  let user = cookies().get("user")
  if (!user) return
  const userItem = JSON.parse(user.value)

  const items = await prisma.item.findMany({
    where: {
      userId: userItem.id
    }
  })

  return (
    <main className='py-10 container mx-auto'>
      {
        user
          ? (<h1 className='head-text'>Lista de <span className='text-fuchsia-600'>{userItem.name}</span></h1>)
          : (<h1 className='head-text'>Lista de <span className='text-fuchsia-600'>regalos</span></h1>)
      }

      <p className='p-text'>Haz tu lista de regalos y compartela con tus familiares y amigos</p>

      {
        !user && (<LoginForm />)
      }

      {
        user && (
          <div className='w-full flex items-start gap-4 mt-10' >
            <div className="w-4/12">
              <CreateItemListForm />
            </div>


            <div className="w-8/12">
              <TableItems items={items} />
              <CreateLink />
            </div>

          </div>
        )
      }



    </main>
  )
}
