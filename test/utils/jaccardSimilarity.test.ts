import { describe, it, expect } from "vitest";
import { jaccardSimilarity } from "../../src/utils/jaccardSimilarity";

describe("utils/jaccardSimilarity", () => {
	it("should return 1 for identical strings", () => {
		expect(jaccardSimilarity("hello", "hello")).toBe(1);
	});

	it("should return 0 for completely different strings", () => {
		expect(jaccardSimilarity("abc", "xyz")).toBe(0);
	});

	it("should calculate similarity correctly for an address-like input", () => {
		expect(
			jaccardSimilarity(
				"123 Main St, Springfield",
				"123 Main Street, Springfield"
			)
		).toBe(0.6);
	});
});
