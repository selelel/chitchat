import { HOST } from "@/constants/host";
import { ServerTypes } from "@/lib/types/appInitialStateType";

export const fecthServerStatus = async () => {
  const response = await fetch(`${HOST.LOCALHOST}/app/status`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if(response.status === 200) return 'ONLINE'
  else return 'DOWN'
};
