import { FastifyReply, FastifyRequest } from "fastify";
import { AddressValidationBody } from "../schemas/address.schema.js";
import { Nominatim } from "../services/Nominatim.js";
import { jaccardSimilarity } from "../utils/jaccardSimilarity.js";

const STATUS_TYPE = {
	VALID: "valid",
	CORRECTED: "corrected",
	UNVERIFIABLE: "unverifiable",
} as const;

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

		if (!addressInfo.features.length)
			return { status: STATUS_TYPE.UNVERIFIABLE };

		const {
			properties: {
				geocoding: {
					type,
					name,
					housenumber,
					street: streetInfo,
					city,
					state,
					postcode,
					country,
				},
			},
		} = addressInfo.features[0];

		const street = type === "street" ? name : streetInfo;
		let status: (typeof STATUS_TYPE)[keyof typeof STATUS_TYPE] =
			STATUS_TYPE.VALID;

		// usually users type only the street + city so I am only comparing that case but
		// I could also check on the length and prepare a function to add more address properties
		const similarityScore = jaccardSimilarity(
			address,
			`${housenumber} ${type === "street" ? name : street}, ${city}`
		);

		if (similarityScore < 0.5) status = STATUS_TYPE.CORRECTED;

		return {
			status,
			address: {
				number: housenumber || "N/A",
				street: street || "",
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
