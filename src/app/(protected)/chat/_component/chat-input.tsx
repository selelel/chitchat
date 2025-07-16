import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useFormField,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Message, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CHAT_EVENT } from '@/constants/socket'
import { LOCALSTORAGE } from '@/constants/localstorage'
import { localStorageGetItem } from '@/utils/helper/localstorage'
import useSocket from '@/utils/socket/socketHook'
import { env } from '@/config/env'
import { useChatContext } from '../_context/chatContext'
import { Socket } from 'socket.io-client'

const formSchema = z.object({
    message: z.string({ required_error: 'Please Send A Message' }),
})

function ChatInput({ socket }: { socket: Socket }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: '',
        },
    })

    const handleSendMessage = (values: z.infer<typeof formSchema>) => {
        if (socket && socket.connected) {
            socket.emit(CHAT_EVENT['SENT_MESSAGES'], {
                text: values.message,
            })
            form.reset()
        } else {
            console.error('Socket not connected')
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSendMessage)}
                    className="space-y-8 h-fit"
                >
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => {
                            const states = useFormField()
                            return (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormDescription>
                                        Please be polite when making messages.
                                    </FormDescription>
                                    <FormControl>
                                        <div className="flex gap-2 h-14 *:h-full">
                                            <Input
                                                autoComplete="off"
                                                placeholder="How are you!"
                                                {...field}
                                            />
                                            <Button className="px-10">
                                                Send
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                </form>
            </Form>
        </div>
    )
}

export default ChatInput
