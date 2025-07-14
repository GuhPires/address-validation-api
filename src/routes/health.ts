import { FastifyInstance } from "fastify";

export default async function healthRoute(fastify: FastifyInstance) {
	fastify.get("/", async () => {
		return { status: "ok" };
	});
}
