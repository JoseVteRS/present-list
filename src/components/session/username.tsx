import { auth } from "@/auth"

export const SessionUsername = async () => {

    const user = await auth()

    return (
        <span>
            {
                !user ? "" : user.user.username
            }
        </span>
    )
}
