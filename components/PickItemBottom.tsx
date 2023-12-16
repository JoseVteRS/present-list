'use client'

import { Button } from "./ui/button"

export const PickItemBottom = ({ id, userId }: { id: string, userId: string }) => {

    const updatePresent = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/item/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId}),
            cache: "no-cache"
        })
    }


    return (
        <Button className="btn" onClick={updatePresent} >Regalar</Button>
    )
}
