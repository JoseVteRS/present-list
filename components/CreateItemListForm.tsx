"use client"

import { useIsMounted } from '@/lib/hooks/isMounted';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { v4 as generateUuid } from "uuid"
import randomstring from "randomstring"
import { useForm } from 'react-hook-form';
import { useStore, } from 'zustand';
import useItemStore from '@/store/list';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface Item {
    id?: string;
    giftName: string
    giftLink: string
    giftDescription?: string
}

const LOCASTORAGE_KEY = "items"


const CreateItemListForm = () => {
    const isMounted = useIsMounted()

    const [items, setItems] = useState<Item[]>([])
    const { handleSubmit, register, reset } = useForm()
    const itemStore = useStore(useItemStore)

    const handleOnSubmit = async (values: any) => {
        try {
            const res = await fetch(`/api/item/create`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            const item = await res.json()
            itemStore.addItem(item)
            reset()
        } catch (error) {
            console.log(error)
        }
    }

    if (!isMounted) return null
    return (

        <form className='flex flex-col w-full'
            onSubmit={handleSubmit(handleOnSubmit)}
        >

            <div className='space-y-2'>
                <Input
                    className='w-full'
                    type="text"
                    id={`name`}
                    placeholder='Introduce el nombre del regalo'
                    {...register("name")}
                />

                <Input
                    className='w-full'
                    type="text"
                    id={`link`}
                    placeholder="https://amazon.es"
                    {...register("link")}
                />

                <Textarea
                    className='w-full'
                    id="description" cols={30} rows={10}
                    {...register("description")}
                />

            </div>

            <div className='flex items-center justify-end gap-2 w-full'>
                <Button type="submit" className='btn'>Añadir</Button>
            </div>
        </form >


    )
}

export default CreateItemListForm