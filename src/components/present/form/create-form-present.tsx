"use client"

import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { List } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PresentCreate } from '@/server/schemas'
import useListStore from '@/server/store/list'
import { presentCreate } from '@/server/actions/present'



export const CreatePresentForm = () => {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const { lists } = useListStore((state) => ({
    lists: state.lists
  }))

  const form = useForm<z.infer<typeof PresentCreate>>({
    resolver: zodResolver(PresentCreate),
    defaultValues: {
      name: "",
      description: "",
      link: "",
      listId: undefined
    }
  })


  async function onSubmit(values: z.infer<typeof PresentCreate>) {
    try {
      console.log(values)

      const [error, newPresent] = await presentCreate(values)

      if (error) {
        setError(error)
      }

      if (!error && newPresent) {
        setSuccess("Lista creada con exito")
      }
    } catch (error: any) {
      setError(error.message)
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
              <Select onValueChange={field.onChange} defaultValue={field.value} {...field} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una lista" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    lists.map((list: List) => (
                      <SelectItem key={list.id} value={list.id}>{list.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type='submit' variant="brand" className='w-full'>Guardar</Button>
      </form>
    </Form>
  )
}
