# Address Validation API

API that validates and standardizes property addresses.

## Intro

This app only has 2 endpoints:

- `GET /health`: just a quick check to make sure that the app is working.
- `POST /validate-address`: accepts an `address` property in free-form text as part of the request body and returns a structured, validated version of the address, including street, number, city, state, and zip code. It also returns if the address is valid, corrected or unverifiable. For now, this is strictly limited to US addresses.

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
