import { ListItem } from "./_components/List";


export default function ListDetailPage({ params }: { params: { listId: string } }) {
 

  return (
    <div className="mt-10">
      <ListItem listId={params.listId} />
    </div>
  );
}