import { cookies } from 'next/headers'
import Link from 'next/link'

export const CreateLink = () => {

    const user = cookies().get("user")

    if (!user) return (<p>No link</p>)

    const info = JSON.parse(user?.value)

    return (
        <Link href={`http://localhost:3000/list/${info.id}`}>Link</Link>
    )
}
