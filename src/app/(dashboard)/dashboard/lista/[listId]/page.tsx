import { listGetById } from "@/server/actions/list";
import { ListItem } from "./_components/List";


export default async function ListDetailPage({ params }: { params: { listId: string } }) {

  const [error, list] = await listGetById(params.listId)

  if (error) {
    return <div>{error as string}</div>
  }
  return (
    <div className="mt-10">
      {
        !list
          ? (<div>Cargando lista</div>)
          : (<ListItem list={list} />)
      }

    </div>
  );
}