# k6 Tests

## How to run k6 tests

1. Before running the tests, please check if you have k6 installed. If not, check the [documentation](https://grafana.com/docs/k6/latest/set-up/install-k6/).

2. Create your .env file, copy env variables from .env.example (the one from test-k6 folder) and complete it with your data.

3. To locally run regression tests with k6 use:

```bash
$ yarn test:k6
```

To run a specific module, use the --module flag. For example: `yarn test:k6 --module=exampleTests`.

## k6 tests setup guide

Follow these steps to set up and write k6 tests:

1. Define a folder for the module. Create a dedicated folder for the specific module you are testing.

2. Write tests for queries / endpoints.

Implement k6 tests for the relevant queries or endpoints you need to validate.
Examples:

- [REST API](./example-tests/rest-api-tests/get-crocodiles.ts)

3. Organize tests into groups. Group related tests together for better structure and maintainability. See [example](./example-tests/example-tests.ts).

4. Update [setup.ts](./setup.ts).

Create exec function in `setup.ts`, e.g.:

```typescript
const executeUsers = (data: SetUpParameters) => users(data.requestUrl)
```

Use exec function in Scenarios. Link the functions to your scenarios in `setup.ts`, e.g.:

```typescript
export const SCENARIOS: Record<string, Scenario> = {
    users: createScenario('executeUsers'),
}
```
