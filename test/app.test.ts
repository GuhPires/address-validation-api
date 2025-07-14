import { describe, it, expect } from "vitest";
import { buildApp } from "../src/app.js";

describe("Health Route", () => {
	it("should return status ok", async () => {
		const app = buildApp({ logger: false });
		const res = await app.inject({ method: "GET", url: "/health" });

		expect(res.statusCode).toBe(200);
		expect(res.json()).toEqual({ status: "ok" });
	});
});
