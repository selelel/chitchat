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
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
    message: z
        .string({ required_error: 'Please Send A Message' })
        .min(0, "Please don't send an empty message"),
})

interface ChatInputProps {
    onSubmit: (values: z.infer<typeof formSchema>) => void
}

function ChatInput({ onSubmit }: ChatInputProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values)
        form.reset()
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
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
