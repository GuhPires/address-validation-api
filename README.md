# Address Validation API

API that validates and standardizes property addresses.

## Intro

This app only has 2 endpoints:

- `GET /health`: just a quick check to make sure that the app is working.
- `POST /address/validate`: accepts an `address` property in free-form text as part of the request body and returns a structured, validated version of the address, including street, number, city, state, and zip code. It also returns if the address is valid, corrected or unverifiable. For now, this is strictly limited to US addresses.

## Getting Started

This is a Node API that uses the [Fastify](https://fastify.dev/) framework with TypeScript.

### Running locally

To run this locally just need to install all dependencies by

```shell
npm i
```

> Make sure that you have the correct Node version to run this project first. I suggest to use `nvm` since there's a `.nvmrc` file and do:
>
> ```shell
> nvm use
> ```

Then copy the `.env.example` with

```shell
cp .env.example .env
```

And edit following the instructions in that file. After all that you can finally run

```shell
npm run dev
```

To run the app locally. When running, you can manually send a CURL to `GET /health`, use the browser, or some application like [Postman](https://www.postman.com/) and it should return:

```json
{ "status": "ok" }
```

### Testing

This app uses `vitest` to run automated tests and it can be run by simply

```shell
npm t
```

### Project structure

```text
address-validation-api/
├── .env
├── .env.example
├── .gitignore
├── .nvmrc
├── README.md
├── package-lock.json
├── package.json
├── tsconfig.json
├── src/
│ ├── app.ts
│ ├── config/
│ │ └── env.ts
│ ├── handlers/
│ │ ├── address.handler.ts
│ │ └── health.handler.ts
│ ├── routes/
│ │ ├── address.route.ts
│ │ └── health.route.ts
│ ├── schemas/
│ │ ├── address.schema.ts
│ │ └── health.schemas.ts
│ ├── server.ts
│ ├── services/
│ │ └── Nominatim.ts
│ └── utils/
│   └── jaccardSimilarity.ts
└── test/
  └── utils/
    └── jaccardSimilarity.test.ts
└── app.test.ts
```

Since it's a very simple application, I kept simple and didn't separated the business logic into a `domain/`, but that could be done to separate entities from each other.

### AI Tools

Didn't actually used any AI tools for this project since it was pretty straight forward, only used for research purposes. The prompts I used in regular/free ChatGPT:

> "I am developing backend system and I need an API that will do address validation based on a text input, please list me few options that I can use that are: free to use (or have a generous free tier) and simple to fetch (no multiple endpoints to get different entities). I know that Google has the Geocoding API but it needs me to use a credit card, so avoid those ones."

The result was a list of 5 APIs, I have tested 2 and decided to use [Nominatim](https://nominatim.org/release-docs/develop/api/Overview/)

> "I am developing a string comparision algorithm and I need to grade the level of similarity between 2 strings. List me few algorithms that do that and explain why they work and what they are doing. After that, list them in order of simplicity and precisiness."

The result was 2 algorithms: [Levenshtein](https://en.wikipedia.org/wiki/Levenshtein_distance) and [Jaccard](https://en.wikipedia.org/wiki/Jaccard_index). I chose to go with Jaccard since it's more simple and it's only caring about word-level differences and not character by character difference. It also has a easy-to-follow implementation which doesn't really require much explanation (even though I commented the theory behind it on the file as well).
