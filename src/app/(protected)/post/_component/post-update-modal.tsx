import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    update_post_form_schema,
    update_post_form_types,
} from '@/lib/schemas/post.form.dto'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useUpdatePostMutation } from '@/lib/features/post/postApi'

interface PostEditModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onUpdatedChange: React.Dispatch<React.SetStateAction<boolean>>
    postId: string
    description: string
    audience: string
}

const audienceOptions = ['Public', 'Friends', 'Only Me']

function PostEditModal({
    open,
    onOpenChange,
    postId,
    description,
    audience,
}: PostEditModalProps) {
    const [updatePost, { data, isLoading, error }] = useUpdatePostMutation()
    const form = useForm<update_post_form_types>({
        resolver: yupResolver(update_post_form_schema),
        defaultValues: {
            descriptions: description,
            audience: audience,
        },
    })

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = form

    useEffect(() => {
        if (open) {
            reset({
                descriptions: description,
                audience: audience,
            })
        }
    }, [open, description, audience, reset])

    // TODO: might introduce bug in the server where it erases the data [tags, text, or images] because we past the value here
    const handleUpdatePost = async (data: update_post_form_types) => {
        updatePost({
            id: postId,
            updateContent: {
                description: data.descriptions,
            },
            option: {
                audience: data.audience,
            },
        })
        if (!data) return
        await new Promise((resolve) => setTimeout(resolve, 1000))
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit post</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(handleUpdatePost)}
                        className="space-y-4"
                    >
                        <div className="flex flex-col w-full">
                            <FormField
                                control={control}
                                name="descriptions"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="What's on your mind?"
                                                rows={5}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={control}
                            name="audience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Audience</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your audience" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {audienceOptions.map(
                                                (data, idx) => (
                                                    <SelectItem
                                                        key={idx}
                                                        value={data
                                                            .toLowerCase()
                                                            .replaceAll(
                                                                ' ',
                                                                '_'
                                                            )}
                                                    >
                                                        {data}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select who can see your post.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default PostEditModal
