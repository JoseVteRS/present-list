'use client'

import { Loader } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"


export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const onSubmit = useCallback(() => {

        if (success || error) return

        if (!token) {
            setError("Token no encontrado")
            return
        }
        newVerification(token)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
            .catch(() => {
                setError("Something went wrong")
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])



    return (
        <div className="min-h-screen w-full">
            <Card>
                <CardContent>
                    <CardTitle>Verification</CardTitle>
                    <CardHeader>
                    </CardHeader>
                    {
                        !error && !success && (
                            <Loader className="animation animate-spin" />
                        )
                    }
                    {
                        !success && (
                            <div className="text-red-500">
                                {error}
                            </div>
                        )
                    }
                    <Button asChild>
                        <Link href="/auth/login">
                            Back to login
                        </Link>
                    </Button>
                </CardContent>

            </Card>
        </div>

    )
}
