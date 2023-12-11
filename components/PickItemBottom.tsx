'use client'

export const PickItemBottom = ({ id, userId }: { id: string, userId: string }) => {

    const updatePresent = async () => {
        await fetch(`http://localhost:3000/api/item/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId}),
            cache: "no-cache"
        })
    }


    return (
        <button className="btn" onClick={updatePresent} >Regalar</button>
    )
}
