import { Inter, Poppins, Flow_Circular, DM_Serif_Display} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const poppins = Poppins({
    subsets: ["latin"],
    variable: '--font-poppins',
    weight: ["100", "400", "600"]
});
export const flow_cicular = Flow_Circular({
    subsets: ["latin"],
    weight: "400"
});

export const dm_serif_display = DM_Serif_Display({
    subsets: ["latin"],
    weight: "400"
});