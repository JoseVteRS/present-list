export const runtime = 'edge'
import { DashboardSection } from "@/components/DashboardSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listGetAllByOwn } from "@/server/actions/list";
import { presentGetAll } from "@/server/actions/present";

export default async function Dashboard() {

  const [presentsError, presents] = await presentGetAll()
  const [listsError, lists] = await listGetAllByOwn()

  return (
    <DashboardSection title="Escritorio">
      <div className="space-y-3 mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Listas</CardTitle>
            <CardDescription>Cantidad de listas que has creado</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-bold text-3xl">{lists?.length ?? 'No hay listas creadas'}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Regalos</CardTitle>
            <CardDescription>Cantidad de regalos que has creado</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-bold text-3xl">{presents?.length ?? 'No hay regalos creados'}</span>
          </CardContent>
        </Card>
      </div>
    </DashboardSection>
  );
}