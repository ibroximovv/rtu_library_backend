import { Logger } from "@nestjs/common"
import * as dotenv from 'dotenv'

dotenv.config()

export type ConfigType = {
    API_PORT: number
    DATABASE_URL: string
    JWT_SECRET: string
    JWT_EXPIRATION_TIME: string
}

const requiredVariables = [
    'API_PORT',
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_EXPIRATION_TIME'
]

const missingVariables = requiredVariables.filter((variable) => {
    const value = process.env[variable]
    return !value || value.trim() === ''
})

if (missingVariables.length > 0) {
    Logger.error(`Missing required environment variables: ${missingVariables.join(', ')}`),
        process.exit(1)
}

export const config: ConfigType = {
    API_PORT: parseInt(process.env.API_PORT as string, 10),
    DATABASE_URL: process.env.DATABASE_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME as string
}