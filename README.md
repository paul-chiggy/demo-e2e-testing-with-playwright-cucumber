# demo-e2e-testing-playwright-cucumber

Demo project for the end-to-end testing with Playwright and Cucumber

## Intro

This small NodeJS project show-cases a test automation implementation based on Playwright testing framework and Cucumber library, using Behaviour-Driven Scenario's, Typescript and multy-layer test automation architecture.

## Description

This implementation encompases several test-cases that test the To-Do List functionality (like ToDo items CRUD or Filtering) of a small open online app at https://todomvc.com/.

There are 2 types of tests in this project (for show-casing purposes) that essentially tests the same functionality:
- End-to-end test specs (Playwright + Typescript)
- End-to-end BDD feature specs (Cucumber + Gherkin + Playwright + Typescript)

End-to-end UI tests (Playwright) can be found in the `./tests/e2e` directory. There are 2 separate spec files, 1 for the CRUD todo functionality, and 1 for the filtering functionality.

Cucumber tests (BDD scenarios a.k.a. features) and their respective step definitions can be found in the `./tests/bdd` folder. How to run both types of tests you can see below.

This project makes use of the multi-layer test automation architecture, namely you can observe the following layers:
- Test layer - this is where all the test logic happens. Its decoupled from other layers, like the Business one and is only responsible for test logic. E.g. `./tests/e2e` and `./tests/bdd`;
- Business layer - This is the layer where all business-related logic of the application happens. E.g. `./support/stepper.ts` or `./support/asserter.ts`;
- Setup layer - a separate tiny layer responsible for setting things up, like brouser, page, configs and stuff. E.g. `./support/setup.ts`;
- Core layer - finally, the test framework layer itself (in this case both Playwright and Cucumber)

## How to run
### Pre-requisites
- Node JS (>= 20)
- Git
- Browsers (like Chrome or Firefox)
- Docker - if you would like to run it in Docker

### Steps
1. Checkout this project from Git;
2. Install dependancies with `npm install`;
3. Run the project with Playwright in the UI mode with `npm run test:ui`;
4. Or run it with Playwright in the CLI mode with `npm run test:cli`;
5. Or run it with Cucumber (BDD scenario's) in the CLI mode with `npm run test:bdd`;
6. Additionally, you can run it in Docker:
    - with Playwright by running `docker-compose up test-e2e`;
    - or with Cucumber (BDD scenario's) with `docker-compose up test-bdd`;

### Test reports

You can also view test reports after you have run the tests:
- for Playwright test reports run `npm run report:open` or open the report file `./playwright-report/index.html` directly in your browser;
- for Cucumber test reports open the following report file `./cucumber-report/report.html` in your browser;