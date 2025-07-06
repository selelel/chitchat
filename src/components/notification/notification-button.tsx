import React, { useState } from 'react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { BellDot } from 'lucide-react'
import NotificationDialogContent from './notification-dialog-content'

function NotificationButton() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <BellDot />
            </DialogTrigger>
            <NotificationDialogContent open={open} />
        </Dialog>
    )
}

export default NotificationButton
