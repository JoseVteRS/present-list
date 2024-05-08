
import { auth } from "@/auth";
import { Hero } from "@/components/home/Hero";
import ExternalLink from "@/components/ui/external-link";


export default async function Home() {

  const currentUser = await auth()

  return (
    <main className='relative h-[calc(100vh-56px)]'>
      {/* <div className="absolute inset-0 -z-10 h-full w-full dark:bg-neutral-900"></div> */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800 
      from-neutral-100 to-neutral-50
      "></div>
      

      <div className="container mx-auto py-5">
        Si detectas algún problema o error, sientete libre de
        <ExternalLink
          href="https://josevte.com"
          className="underline decoration-dotted underline-offset-4"
        >
          {" "} crear un issue
        </ExternalLink>{" "} enGithub
      </div>

      <Hero />
    </main>
  )
}
