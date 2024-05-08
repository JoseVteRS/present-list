"use client"
import { useTransition, useState } from "react"
import { useSession } from "next-auth/react"
import z from "zod"
import { useForm } from "react-hook-form"
import { SettingsSchema } from "@/server/schemas"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { settings } from "@/server/actions/settings"
import UserInfo from "@/components/dashboard/UserInfo"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormSuccess } from "@/components/FormSuccess"
import { FormError } from "@/components/FormError"
import { toast } from "sonner"

export default function SettingsPage() {
  const user = useCurrentUser()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()


  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
    }
  })


  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    if (values.email === user?.email && values.name === user.name) {
      setError("Nada que actualizar")
      return
    }
    startTransition(() => {
      settings({
        name: values.name,
        email: values.email,
        isTwoFactorEnabled: values.isTwoFactorEnabled
      })
        .then(([error, data]) => {
          if (error) {
            setError(error)
          }
          if (data) {
            toast.success(data)
          }
        })
        .catch(() => setError("Something went wrong"))
    })

  }


  return (
    <div className="p-10 rounded-xl w-full">

      <Card>
        <CardHeader>
          <CardTitle>
            Ajustes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Jose" {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Jose" {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormSuccess message={success} />
              <FormError message={error} />

              <Button type="submit" variant="brand" disabled={isPending}>Guardar</Button>
            </form>
          </Form>
        </CardContent>

      </Card>

    </div>
  );
}