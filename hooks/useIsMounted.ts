import { useEffect, useState } from "react"



export const useIsMounted = () => {
    const [isMounted, setisMounted] = useState(false)

    useEffect(() => {
        setisMounted(true)
    }, [isMounted])

    return isMounted
}
