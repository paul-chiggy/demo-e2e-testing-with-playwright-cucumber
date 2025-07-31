import { Given, When, Then, Before, After, BeforeAll, AfterAll} from "@cucumber/cucumber";
import { chromium, Page, BrowserContext } from "@playwright/test";
import { pages, todoItemsFilter } from "../../../support/test-data";
import { Stepper } from "../../../support/stepper";
import { Asserter } from "../../../support/asserter";
import { Setup } from "../../../support/setup";

let page: Page;
let context: BrowserContext;
const stepper = new Stepper();
const asserter = new Asserter();
const setupPromise = Setup.create(chromium);

BeforeAll(async function () {
  const setup = await setupPromise;
  page = setup.page;
  context = setup.context;
});

AfterAll(async function () {
  await setupPromise.then(setup => setup.shutdown());
});

Before(async function () {
  await stepper.navigateTo(page, pages.home + pages.todoList);
});

After(async function () {
  await context.clearCookies();
});

// =================
// Add todo steps
// =================

Given("User is on the todo list page", async function () {
  await asserter.verifyEmptyTodoList(page);
});

When(
  "User enters the todo item {string} and presses Enter",
  async ( todoItem ) => {
    await stepper.addTodoItem(page, todoItem);
  }
);

Then("User should see the todo item {string} in the list", async ( todoItem: string ) => {
  await asserter.verifyActiveTodoItem(page, todoItem);
  await asserter.verifyActiveTodoCount(page, 1);
  await asserter.verifyTotalTodoCount(page, 1);
});

// =================
// Update Todo Steps
// =================

Given("User has a todo item {string}", async function ( todoItem ) {
  await stepper.addTodoItem(page, todoItem);
  await asserter.verifyActiveTodoItem(page, todoItem);
});

When(
  "User updates an active todo item to {string}",
  async ( todoItemNew ) => {
    await stepper.updateTodoItem(page, todoItemsFilter[1], todoItemNew);
  }
);

When(
  "User updates a completed todo item to {string}",
  async ( todoItemNew ) => {
    await stepper.updateTodoItem(page, todoItemsFilter[0], todoItemNew);
  }
);

Then("User should see the updated active todo item {string} in the list", async ( todoItemUpdated ) => {
  await asserter.verifyActiveTodoItem(page, todoItemUpdated);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[2]);
  await asserter.verifyCompletedTodoItem(page, todoItemsFilter[0]);
  await asserter.verifyActiveTodoCount(page, 2);
  await asserter.verifyTotalTodoCount(page, 3);
});

Then("User should see the updated completed todo item {string} in the list", async ( todoItemUpdated ) => {
  await asserter.verifyCompletedTodoItem(page, todoItemUpdated);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[1]);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[2]);
  await asserter.verifyActiveTodoCount(page, 2);
  await asserter.verifyTotalTodoCount(page, 3);
});

// ===================
// Complete Todo Steps
// ===================

When("User completes the todo item {string}", async ( todoItem ) => {
  await stepper.toggleTodoItemCompletion(page, todoItem);
});

Then("User should see the todo item {string} marked as completed", async ( todoItem ) => {
  await asserter.verifyCompletedTodoItem(page, todoItem);
  await asserter.verifyActiveTodoCount(page, 0);
  await asserter.verifyTotalTodoCount(page, 1);
});

// =================
// Delete Todo Steps
// =================

When("User deletes an active todo item", async () => {
  await asserter.verifyActiveTodoCount(page, 2);
  await asserter.verifyTotalTodoCount(page, 3);
  await stepper.deleteTodoItem(page, todoItemsFilter[1]);
});

When("User deletes a completed todo item", async () => {
  await asserter.verifyActiveTodoCount(page, 2);
  await asserter.verifyTotalTodoCount(page, 3);
  await stepper.deleteTodoItem(page, todoItemsFilter[0]);
});

Then("Deleted active todo item should not be present in the todo list", async () => {
  await asserter.verifyActiveTodoCount(page, 1);
  await asserter.verifyTotalTodoCount(page, 2);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[2]);
  await asserter.verifyCompletedTodoItem(page, todoItemsFilter[0]);
});

Then("Deleted completed todo item should not be present in the todo list", async () => {
  await asserter.verifyActiveTodoCount(page, 2);
  await asserter.verifyTotalTodoCount(page, 2);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[1]);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[2]);
});

// =================
// Filter Todo Steps
// =================

Given("User has todos with different statuses", async function () {
  await stepper.addTodoItem(page, todoItemsFilter[0]);
  await stepper.addTodoItem(page, todoItemsFilter[1]);
  await stepper.addTodoItem(page, todoItemsFilter[2]);
  await stepper.toggleTodoItemCompletion(page, todoItemsFilter[0]);
});

When("User applies the Active status filter", async () => {
  await stepper.filterActiveTodos(page);
});

Then("Only active todo items should be displayed", async () => {
  await asserter.verifyActiveTodoCount(page, 2);
  await asserter.verifyTotalTodoCount(page, 2);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[1]);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[2]);
});

When("User applies the Completed status filter", async () => {
  await stepper.filterCompletedTodos(page);
});

Then("Only completed todo items should be displayed", async () => {
  await asserter.verifyActiveTodoCount(page, 2);
  await asserter.verifyTotalTodoCount(page, 1);
  await asserter.verifyCompletedTodoItem(page, todoItemsFilter[0]);
});

When("User applies the All statuses filter", async () => {
  await stepper.filterAllTodos(page);
});

Then("Todo items with all statuses should be displayed", async () => {
  await asserter.verifyActiveTodoCount(page, 2);
  await asserter.verifyTotalTodoCount(page, 3);
  await asserter.verifyCompletedTodoItem(page, todoItemsFilter[0]);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[1]);
  await asserter.verifyActiveTodoItem(page, todoItemsFilter[2]);
});