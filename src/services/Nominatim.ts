/**
 * NOMINATIM is a FREE TO USE and OPENSOURCE API for Goecoding. Please visit https://nominatim.org/release-docs/develop/ for more info
 */

type SearchAddressResponse = {
	type: string;
	geocoding: {
		version: string;
		attribution: string;
		licence: string;
		query: string;
	};
	features: {
		type: string;
		properties: {
			geocoding: {
				place_id: number;
				osm_type: string;
				osm_id: number;
				osm_key: string;
				osm_value: string;
				type: string;
				name: string;
				label: string;
				housenumber: string;
				postcode: string;
				street: string;
				district: string;
				city: string;
				county: string;
				state: string;
				country: string;
				country_code: string;
			};
		};
	}[];
};

export class Nominatim {
	#url = "https://nominatim.openstreetmap.org";

	async #request<T = unknown>(path: string): Promise<T> {
		try {
			const response = await fetch(`${this.#url}/${path}`);
			return (await response.json()) as T;
		} catch (err) {
			throw err;
		}
	}

	async searchAddress(address: string) {
		const params = {
			q: address,
			format: "geocodejson",
			addressdetails: "1",
			limit: "1",
		};

		return await this.#request<SearchAddressResponse>(
			`/search?${new URLSearchParams(params)}`
		);
	}
}
