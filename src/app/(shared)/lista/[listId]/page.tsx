import { PresentItem } from "@/components/list/shared-list-item";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listGetByIdShared } from "@/server/actions/list";

export default async function SharedListPage({ params: { listId } }: { params: { listId: string } }) {

  const [error, list] = await listGetByIdShared(listId)


  return (
    <div className="container mx-auto pt-5">
      <h1 className="text-center text-2xl">Lista de <span className="font-bold">{list?.user.name}</span></h1>
      <div className="mt-10">
        <Table className="space-y-5">
          <TableHeader className="dark:bg-neutral-900">
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {
              list?.presents.map((item) => {
                return (
                  <PresentItem key={item.id} present={item} />
                )
              })
            }
          </TableBody>

        </Table>
      </div>

    </div>
  );
}