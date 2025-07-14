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

export const addressValidationResposeSchema = {
	200: {
		type: "object",
		properties: {
			validated: { type: "boolean" },
		},
		required: ["validated"],
	},
	400: {
		type: "object",
		properties: {
			error: { type: "boolean" },
			message: { type: "string" },
		},
		required: ["error", "message"],
	},
} as const;
