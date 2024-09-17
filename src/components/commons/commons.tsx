'use client'
import { DM_Serif_Display } from "next/font/google";

const dm_serif_display = DM_Serif_Display({
    subsets: ["latin"],
    weight: "400"
});

export const ccl = ({className} : {className?: string}) => <h4 className={`whitespace-nowrap text-2xl break-n font-normal text-custom-black ${dm_serif_display.className} ${className}`}>ChitChat</h4>


