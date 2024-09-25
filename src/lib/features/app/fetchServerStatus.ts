import { SERVER_URI } from "@/config/env";

export const fecthServerStatus = async () => {
  const response = await fetch(`${SERVER_URI}/app/status`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if(response.status === 200) return 'ONLINE'
  else return 'DOWN'
};
