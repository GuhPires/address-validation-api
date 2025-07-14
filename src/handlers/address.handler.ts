import { FastifyReply, FastifyRequest } from "fastify";
import { AddressValidationBody } from "../schemas/address.schema.js";
import { Nominatim } from "../services/Nominatim.js";

export async function addressValidationHandler(
	request: FastifyRequest<{ Body: AddressValidationBody }>,
	reply: FastifyReply
) {
	const { address } = request.body;

	if (!address || !address.trim())
		return reply
			.code(400)
			.send({ error: true, message: "address property is required" });

	const nominatim = new Nominatim();

	try {
		const addressInfo = await nominatim.searchAddress(address);

		if (!addressInfo.features.length) return { status: "unverifiable" };

		const {
			properties: {
				geocoding: {
					type,
					name,
					housenumber,
					street,
					city,
					state,
					postcode,
					country,
				},
			},
		} = addressInfo.features[0];

		// TODO: check for "corrected"
		return {
			status: "valid",
			address: {
				number: housenumber || "N/A",
				street: type === "street" ? name : street || "",
				city: city || "",
				state: state || "",
				zip: postcode || "",
				country,
			},
		};
	} catch (err) {
		console.error("Lookup error:", err);
		return reply
			.code(500)
			.send({ error: true, message: "address lookup error" });
	}
}
