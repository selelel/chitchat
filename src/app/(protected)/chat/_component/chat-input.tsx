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
    message: z.string({ required_error: 'Please Send A Message' }),
})

function ChatInput() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: '',
        },
    })

    const onSubmit = (values: any) => {
        console.log(values)
        form.reset()
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
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
