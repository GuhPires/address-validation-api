import Fastify from "fastify";
import healthRoute from "./routes/health.js";

export function buildApp({ logger }: { logger: boolean } = { logger: true }) {
	const app = Fastify({ logger });

	app.register(healthRoute, { prefix: "/health" });

	return app;
}
