"use client"

import { Button } from "./ui/button"


export const CopyLink = ({ link }: { link: string }) => {

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link)
    }

    return (
        <Button variant="secondary" onClick={copyToClipboard} >Copiar link</Button>
    )
}
