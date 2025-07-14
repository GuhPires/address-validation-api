import * as dotenv from "dotenv";

dotenv.config();

function getEnv<T>(name: string, defaultValue?: T): T {
	const value = process.env[name] ?? defaultValue;
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value as T;
}

type Config = {
	port: number;
	nodeEnv: "production" | "development";
};

export const config: Config = {
	port: parseInt(getEnv("PORT", "3000")),
	nodeEnv: getEnv<Config["nodeEnv"]>("NODE_ENV", "development"),
};
