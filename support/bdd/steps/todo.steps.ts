import { Given, When, Then, Before, After, BeforeAll, AfterAll} from "@cucumber/cucumber";
import { chromium, Page, BrowserContext } from "@playwright/test";
import { todoItems } from "../../../support/test-data";
import { Actor } from "../../framework/actor";
import { Asserter } from "../../framework/asserter";
import { Setup } from "../setup";
import config from '../../../playwright.config';

let page: Page;
let context: BrowserContext;
let actor: Actor;
let asserter: Asserter;
const setupPromise = Setup.create(chromium);

BeforeAll(async function () {
  const setup = await setupPromise;
  page = setup.page;
  context = setup.context;
  actor = new Actor(page);
  asserter = new Asserter(page);
});

AfterAll(async function () {
  await setupPromise.then(setup => setup.shutdown());
});

Before(async function () {
  await actor.goTo(config.use?.baseURL + actor.todoPage.url);
});

After(async function () {
  await context.clearCookies();
});

// ==================
// Add To-do Steps
// ==================

Given("User is on the todo list page", async function () {
  await asserter.verifyEmptyTodoList();
});

When(
  "User enters the todo item {string} and presses Enter",
  async ( todoItem ) => {
    await actor.addTodoItem(todoItem);
  }
);

Then("User should see the todo item {string} in the list", async ( todoItem: string ) => {
  await asserter.verifyActiveTodoItem(todoItem);
  await asserter.verifyActiveTodoCount(1);
  await asserter.verifyTotalTodoCount(1);
});

// ==================
// Update To-do Steps
// ==================

Given("User has a todo item {string}", async function ( todoItem ) {
  await actor.addTodoItem(todoItem);
  await asserter.verifyActiveTodoItem(todoItem);
});

When(
  "User updates an active todo item to {string}",
  async ( todoItemNew ) => {
    await actor.updateTodoItem(todoItems[1], todoItemNew);
  }
);

When(
  "User updates a completed todo item to {string}",
  async ( todoItemNew ) => {
    await actor.updateTodoItem(todoItems[0], todoItemNew);
  }
);

Then("User should see the updated active todo item {string} in the list", async ( todoItemUpdated ) => {
  await asserter.verifyActiveTodoItem(todoItemUpdated);
  await asserter.verifyActiveTodoItem(todoItems[2]);
  await asserter.verifyCompletedTodoItem(todoItems[0]);
  await asserter.verifyActiveTodoCount(2);
  await asserter.verifyTotalTodoCount(3);
});

Then("User should see the updated completed todo item {string} in the list", async ( todoItemUpdated ) => {
  await asserter.verifyCompletedTodoItem(todoItemUpdated);
  await asserter.verifyActiveTodoItem(todoItems[1]);
  await asserter.verifyActiveTodoItem(todoItems[2]);
  await asserter.verifyActiveTodoCount(2);
  await asserter.verifyTotalTodoCount(3);
});

// ====================
// Complete To-do Steps
// ====================

When("User completes the todo item {string}", async ( todoItem ) => {
  await actor.toggleTodoItemCompletion(todoItem);
});

Then("User should see the todo item {string} marked as completed", async ( todoItem ) => {
  await asserter.verifyCompletedTodoItem(todoItem);
  await asserter.verifyActiveTodoCount(0);
  await asserter.verifyTotalTodoCount(1);
});

// ==================
// Delete To-do Steps
// ==================

When("User deletes an active todo item", async () => {
  await asserter.verifyActiveTodoCount(2);
  await asserter.verifyTotalTodoCount(3);
  await actor.deleteTodoItem(todoItems[1]);
});

When("User deletes a completed todo item", async () => {
  await asserter.verifyActiveTodoCount(2);
  await asserter.verifyTotalTodoCount(3);
  await actor.deleteTodoItem(todoItems[0]);
});

Then("Deleted active todo item should not be present in the todo list", async () => {
  await asserter.verifyActiveTodoCount(1);
  await asserter.verifyTotalTodoCount(2);
  await asserter.verifyActiveTodoItem(todoItems[2]);
  await asserter.verifyCompletedTodoItem(todoItems[0]);
});

Then("Deleted completed todo item should not be present in the todo list", async () => {
  await asserter.verifyActiveTodoCount(2);
  await asserter.verifyTotalTodoCount(2);
  await asserter.verifyActiveTodoItem(todoItems[1]);
  await asserter.verifyActiveTodoItem(todoItems[2]);
});

// ==================
// Filter To-do Steps
// ==================

Given("User has todos with different statuses", async function () {
  await actor.addTodoItem(todoItems[0]);
  await actor.addTodoItem(todoItems[1]);
  await actor.addTodoItem(todoItems[2]);
  await actor.toggleTodoItemCompletion(todoItems[0]);
});

When("User applies the Active status filter", async () => {
  await actor.filterActiveTodos();
});

Then("Only active todo items should be displayed", async () => {
  await asserter.verifyActiveTodoCount(2);
  await asserter.verifyTotalTodoCount(2);
  await asserter.verifyActiveTodoItem(todoItems[1]);
  await asserter.verifyActiveTodoItem(todoItems[2]);
});

When("User applies the Completed status filter", async () => {
  await actor.filterCompletedTodos();
});

Then("Only completed todo items should be displayed", async () => {
  await asserter.verifyActiveTodoCount(2);
  await asserter.verifyTotalTodoCount(1);
  await asserter.verifyCompletedTodoItem(todoItems[0]);
});

When("User applies the All statuses filter", async () => {
  await actor.filterAllTodos();
});

Then("Todo items with all statuses should be displayed", async () => {
  await asserter.verifyActiveTodoCount(2);
  await asserter.verifyTotalTodoCount(3);
  await asserter.verifyCompletedTodoItem(todoItems[0]);
  await asserter.verifyActiveTodoItem(todoItems[1]);
  await asserter.verifyActiveTodoItem(todoItems[2]);
});