export const healthResponseSchema = {
	200: {
		type: "object",
		properties: {
			status: { type: "string" },
		},
		required: ["status"],
	},
} as const;
