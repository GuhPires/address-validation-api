import { FastifyInstance } from "fastify";
import { healthResponseSchema } from "../schemas/health.schemas.js";
import { healthHandler } from "../handlers/health.handler.js";

export default async function healthRoute(fastify: FastifyInstance) {
	fastify.get(
		"/",
		{ schema: { response: healthResponseSchema } },
		healthHandler
	);
}
