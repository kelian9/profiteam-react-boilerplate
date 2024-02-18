# E2E Tests

[E2E Testing](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test) is a technique that tests your app from the web browser through to the back end of your application, as well as testing integrations with third-party APIs and services. These types of tests are great at making sure your entire app is functioning as a cohesive whole.

Cypress runs end-to-end tests the same way users interact with your app by using a real browser, visiting URLs, viewing content, clicking on links and buttons, etc. Testing this way helps ensure your tests and the user's experience are the same.

## Benefits of end-to-end tests:
* Ensure your app is functioning as a cohesive whole
* Tests match the user experience
* Can be written by developers or QA Teams
* Can be used for integration testing as well

## Run tests

Component tests live in `cypress/e2e/` dir and are run with `npm run cypress:run --e2e` or you can run `npm run cypress:open` for open cypress panel where you can choose any test and run it.
