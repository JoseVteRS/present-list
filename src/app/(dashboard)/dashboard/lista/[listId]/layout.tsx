import { auth } from "@/auth";
import  {db} from "@/server/db"


export default async function ListDetailLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { listId: string }
}) {

  const user = await currentUser()

  const list = await db.list.findFirst({
    where: {
      id: params.listId,
      userId: user?.id || ''
    },
    include: {
      presents: {
        where: { userId: user?.id }
      }
    }
  })


  return (
    <div>
      <h1 className="text-3xl font-bold">{list?.name}</h1>
      <div>
        {children}
      </div>
    </div>
  );
}
