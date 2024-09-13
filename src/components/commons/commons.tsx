'use client'
import { DM_Serif_Display } from "next/font/google";

const dm_serif_display = DM_Serif_Display({
    subsets: ["latin"],
    weight: "400"
});

export const ChitChatLogo = ({className} : {className?: string}) => <h4 className={`text-2xl  font-normal text-custom-black ${dm_serif_display.className} ${className}`}>ChitChat</h4>


