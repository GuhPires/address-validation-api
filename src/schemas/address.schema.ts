import { FromSchema } from "json-schema-to-ts";

export const addressValidationBodySchema = {
	type: "object",
	properties: {
		address: { type: "string" },
	},
	required: ["address"],
} as const;
export type AddressValidationBody = FromSchema<
	typeof addressValidationBodySchema
>;

export const addressValidationResponseSchema = {
	200: {
		type: "object",
		properties: {
			status: { type: "string", enum: ["valid", "corrected", "unverifiable"] },
			address: {
				type: "object",
				properties: {
					number: { type: "string" },
					street: { type: "string" },
					city: { type: "string" },
					state: { type: "string" },
					zip: { type: "string" },
					country: { type: "string" },
				},
			},
		},
		required: ["status"],
	},
	400: {
		type: "object",
		properties: {
			error: { type: "boolean" },
			message: { type: "string" },
		},
		required: ["error", "message"],
	},
	500: {
		type: "object",
		properties: {
			error: { type: "boolean" },
			message: { type: "string" },
		},
		required: ["error", "message"],
	},
} as const;
