const LOCALHOST = process.env.API_URL || "http://localhost:8080";

export const HOST = {
  LOCALHOST,
  GRAFBASE: `${LOCALHOST}/graphql`,
};
