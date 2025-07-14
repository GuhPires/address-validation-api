import Fastify from "fastify";
import healthRoute from "./routes/health.route.js";
import addressRoute from "./routes/address.route.js";

export function buildApp({ logger }: { logger: boolean } = { logger: true }) {
	const app = Fastify({ logger });

	app.register(healthRoute, { prefix: "/health" });
	app.register(addressRoute, { prefix: "/address" });

	return app;
}
