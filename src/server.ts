import { buildApp } from "./app.js";
import { config } from "./config/env.js";

const app = buildApp({ logger: config.nodeEnv === "development" });

try {
	const address = await app.listen({ port: config.port });
	console.log(`Server listening on ${address}`);
} catch (err) {
	app.log.error(err);
	process.exit(1);
}
