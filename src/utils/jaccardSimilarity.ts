/**
 * Computes Jaccard Similarity between two strings.
 * Jaccard Similarity = (number of shared unique words) / (total unique words across both).
 * This is useful for comparing free-text user addresses with validated addresses,
 * allowing us to detect if the address was significantly corrected by the API.
 *
 * Score:
 *   - 0 => completely different addresses
 *   - 1 => identical addresses (same word tokens)
 *
 * =========== EXAMPLE ===========
 *   - a: "123 Main St, Springfield"
 *   - b: "123 Main Street, Springfield"
 * Tokens would be:
 *   - Set 1: {123, main, st, springfield}
 *   - Set 2: {123, main, street, springfield}
 *
 * Intersection: {123, main, springfield} → size = 3
 * Union: {123, main, st, springfield, street} → size = 5
 * Jaccard = 3 / 5 ≈ 0.6
 */

export function jaccardSimilarity(a: string, b: string) {
	const set1 = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
	const set2 = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));

	const intersection = new Set([...set1].filter((x) => set2.has(x)));
	const union = new Set([...set1, ...set2]);

	return intersection.size / union.size;
}
