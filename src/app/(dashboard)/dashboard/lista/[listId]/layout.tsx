import { auth } from "@/auth";
import { listGetById } from "@/server/actions/list";
import { db } from "@/server/db"


export default async function ListDetailLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { listId: string }
}) {
  const [error, list] = await listGetById(params.listId)

  if (error) {
    return <div>{error as string}</div>
  }


  return (
    <div>
      <h1 className="text-3xl font-bold">{list?.name}</h1>
      <div>
        {children}
      </div>
    </div>
  );
}
