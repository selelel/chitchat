require('dotenv/config');
import { headers } from 'next/headers';
import * as Yup from 'yup';

const createEnv = () => {
    const envSchema = Yup.object({
        BASE_API_URL: Yup.string().default("http://localhost:8080"),
    });

    const envVars = {
        BASE_API_URL: process.env.BASE_API_URL,
    };

    try {
        const parsedEnv = envSchema.validateSync(envVars);
        return parsedEnv;
    } catch (error) {
        console.error("Environment validation error:", error);
        throw new Error('Invalid environment variables');
    }
};

const env = createEnv();

const SERVER_URI = env.BASE_API_URL, 
REDIRECT_URL = `${env.BASE_API_URL}/auth/google/login`, 
CLIENT_URI = 'http://localhost:3000', // not yet important
GRAPHQL_URI = `${env.BASE_API_URL}/graphql`;

export { SERVER_URI, REDIRECT_URL, CLIENT_URI, GRAPHQL_URI, env };
