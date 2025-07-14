import { FastifyReply, FastifyRequest } from "fastify";
import { AddressValidationBody } from "../schemas/address.schema.js";

export async function addressValidationHandler(
	request: FastifyRequest<{ Body: AddressValidationBody }>,
	reply: FastifyReply
) {
	const { address } = request.body;

	if (!address || !address.trim())
		return reply
			.code(400)
			.send({ error: true, message: "address property is required" });

	console.log("Address:", address, "type:", typeof address);

	return { validated: true };
}
