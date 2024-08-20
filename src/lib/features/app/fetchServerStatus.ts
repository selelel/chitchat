import { HOST } from "@/constants/host";

export const fecthServerStatus = async () => {
  const response = await fetch(`${HOST.SERVER_URI}/app/status`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if(response.status === 200) return 'ONLINE'
  else return 'DOWN'
};
