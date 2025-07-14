import * as dotenv from "dotenv";

dotenv.config();

function getEnv(name: string, defaultValue?: string): string {
	const value = process.env[name] ?? defaultValue;
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value;
}

export const config = {
	port: parseInt(getEnv("PORT", "3000")),
	nodeEnv: getEnv("NODE_ENV", "development"),
};
