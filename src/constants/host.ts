const LOCALHOST = process.env.API_URL || 'http://localhost:8080'
const REDIRECT_URL = process.env.REDIRECT_URL || 'http://localhost:8080/auth/google/login'
const BASE_URI = process.env.APP_URI || 'http://localhost:3000'

export const HOST = {
  LOCALHOST,
  GRAFBASE: `${LOCALHOST}/graphql`,
  REDIRECT_URL,
  BASE_URI
};
