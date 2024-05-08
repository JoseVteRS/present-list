"use client"

import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Item, List } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PresentEdit } from '@/server/schemas'
import useListStore from '@/server/store/list'
import { listGetAllByOwn } from '@/server/actions/list'
import { presentUpdate } from '@/server/actions/present'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'



export const EditPresentForm = ({ present }: { present: Item }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<any>()
  const [error, setError] = useState<any>()
  const [lists, setLists] = useState<any>()

  useEffect(() => {
    listGetAllByOwn()
      .then(data => {
        const [error, lists] = data
        if (!error) setError(error)
        if (lists) setLists(lists)
      })
  }, [present])

  const form = useForm<z.infer<typeof PresentEdit>>({
    resolver: zodResolver(PresentEdit),
    defaultValues: {
      name: present.name,
      description: present.description ?? "",
      link: present?.link ?? "",
      listId: present?.listId ?? undefined
    }
  })

  async function onSubmit(values: z.infer<typeof PresentEdit>) {
    console.log(values)
    try {
      setIsLoading(true)
      const [error, updatedPresent] = await presentUpdate(present.id, values)
      if (error) {
        setError(error)
      }
      if (updatedPresent) {
        setSuccess("Lista actualizada")
      }
    } catch (error) {
      setError(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5'
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Mesa elevable'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Mesa elevable de 4 patas para poder trabajar de pie y estirar las piernas un poco'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enlace al producto</FormLabel>
              <FormDescription>Poner un enlae al producto para especificar (Opcional)</FormDescription>
              <FormControl>
                <Input
                  type='text'
                  placeholder='https://amazon.es/mesa-elevable'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="listId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lista</FormLabel>
              <FormDescription>Asigna una lista al regalo (Opcional)</FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una lista" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="undefined">Sin lista</SelectItem>
                  {
                    lists && lists.map((list: List) => (
                      <SelectItem key={list.id} value={list.id}>{list.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button type='submit'>Guardar</Button>
      </form>
    </Form>
  )
}
