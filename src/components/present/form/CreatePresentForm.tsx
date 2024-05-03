"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { PresentCreate } from '@/server/schemas'
import useListStore from '@/server/store/list'
import { zodResolver } from '@hookform/resolvers/zod'
import { List } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'



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

      await fetch(`/api/present/create`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
      setSuccess("Lista creada")
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
                  {/* {!lists && (<SelectItem value="">Lista</SelectItem>)} */}
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

        <Button type='submit'>Guardar</Button>
      </form>
    </Form>
  )
}
