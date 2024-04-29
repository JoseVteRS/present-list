
import { Hero } from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {

  const user = await currentUser()

  return (
    <main className=' min-h-[calc(100vh-72px)]'>

      <Hero />

      <section className="my-10 text-xl">
        <div className="container mx-auto">
          {
            !user ?
              (<>
                Crea un usuario y empieza a crear tu primera lista de regalos.
                <div className="mt-2 flex flex-row gap-5">
                  <Button asChild variant="primary">
                    <Link href="/auth/register">Regístrate</Link>
                  </Button>
                </div>
              </>)
              : (<>
                Solicita una demo 
              </>)

          }
          <Button asChild variant="outline">
            <Link href="/auth/register" >Demo</Link>
          </Button>
        </div>

      </section>

    </main>
  )
}
