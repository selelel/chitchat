const SERVER_URI = process.env.SERVER_URI || 'http://localhost:8080'
const REDIRECT_URL = `${process.env.SERVER_URI}/auth/google/login` || 'http://localhost:8080/auth/google/login'
const CLIENT_URI = process.env.CLIENT_URI || 'http://localhost:3000'

export const HOST = {
  SERVER_URI,
  REDIRECT_URL,
  CLIENT_URI,
  GRAPHQL_URI: `${SERVER_URI}/graphql`,
};
