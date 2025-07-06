import React from 'react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { BellDot } from 'lucide-react'
import NotificationDialogContent from './notification-dialog-content'

function NotificationButton() {
    return (
        <Dialog>
            <DialogTrigger>
                <BellDot />
            </DialogTrigger>
            <NotificationDialogContent />
        </Dialog>
    )
}

export default NotificationButton
