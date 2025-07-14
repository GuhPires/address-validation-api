import { FastifyInstance } from "fastify";
import { addressValidationHandler } from "../handlers/address.handler.js";
import {
	addressValidationBodySchema,
	addressValidationResposeSchema,
} from "../schemas/address.schema.js";

export default async function addressRoute(fastify: FastifyInstance) {
	fastify.post(
		"/validate",
		{
			schema: {
				body: addressValidationBodySchema,
				response: addressValidationResposeSchema,
			},
		},
		addressValidationHandler
	);
}
