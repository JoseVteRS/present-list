import { cookies } from 'next/headers'
import Link from 'next/link'

export const CreateLink = () => {

    const user = cookies().get("user")

    if (!user) return (<p>No link</p>)

    const info = JSON.parse(user?.value)

    return (
        <Link 
        className='btn'
        href={`https://wa.me/?text=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/list/${info.id}`)}`}>
            Compartir con tus amigos y familiares
        </Link>
    )
}
